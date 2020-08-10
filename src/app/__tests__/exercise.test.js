import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server';
import { sequelize } from 'db/models';
import dotenv from 'dotenv';
import { constructTestServer } from './__utils';
import { sign } from 'jsonwebtoken';

dotenv.config({ path: '.env' });

const { models } = sequelize;

const GET_ALL_EXERCISES = gql`
  query getExercises {
    getExercises {
      id
      name
      muscleGroups {
        id
        name
      }
    }
  }
`;

const GET_EXERCISE = gql`
  query getExerciseById($id: ID!) {
    getExerciseById(id: $id) {
      id
      name
      muscleGroups {
        id
        name
      }
    }
  }
`;

const CREATE_EXERCISE = gql`
  mutation createExercise($input: exerciseInput!) {
    createExercise(input: $input) {
      name
      muscleGroups {
        id
        name
      }
    }
  }
`;

const UPDATE_EXERCISE = gql`
  mutation updateExercise($id: ID!, $input: exerciseInput!) {
    updateExercise(id: $id, input: $input) {
      name
      muscleGroups {
        id
        name
      }
    }
  }
`;

const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: ID!) {
    deleteExercise(id: $id)
  }
`;

const allExercisesMock = [
  {
    id: 'cee739d2-b887-4c5b-8346-ba1c1690bd94',
    name: 'exercise 1',
    muscleGroups: [
      {
        id: '1',
        name: 'chest',
      },
    ],
  },
];

const newExerciseMock = {
  name: 'new exercise',
  muscleGroups: [
    {
      id: '1',
      name: 'chest',
    },
  ],
};

const createExerciseResponseMock = {
  name: 'new exercise',
  muscleGroups: [
    {
      id: '1',
      name: 'chest',
    },
  ],
};

const updatedExerciseMock = {
  name: 'updated exercise',
  muscleGroups: [{ id: '1', name: 'chest' }],
};

describe('[QUERY] Exercise', () => {
  const server = constructTestServer({
    context: () => ({
      headers: 'Bearer 1',
      loggedUser: { id: 1, email: 'test@email.com' },
      models,
    }),
  });
  it('queries all exercises', async () => {
    models.Exercise.findAll = jest.fn();
    models.Exercise.findAll.mockReturnValueOnce(allExercisesMock);
    const { query } = createTestClient(server);
    const res = await query({ query: GET_ALL_EXERCISES });

    expect(models.Exercise.findAll).toHaveBeenCalled();
    expect(res.data.getExercises).toEqual(allExercisesMock);
    expect(res.data.getExercises).toMatchSnapshot();
  });

  it('get exercise by id', async () => {
    models.Exercise.findOne = jest.fn();
    models.Exercise.findOne.mockReturnValueOnce(allExercisesMock[0]);

    const { query } = createTestClient(server);
    const res = await query({
      query: GET_EXERCISE,
      variables: { id: allExercisesMock[0].id },
    });

    expect(models.Exercise.findOne).toHaveBeenCalled();
    expect(res.data.getExerciseById).toEqual(allExercisesMock[0]);
    expect(res.data.getExerciseById).toMatchSnapshot();
  });
});

describe('[MUTATION] Exercise', () => {
  const jwtToken = sign(
    { id: 1, role: 'ADMIN', email: 'test@email.com' },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  const server = constructTestServer({
    context: () => ({
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      loggedUser: { id: 1, email: 'test@email.com' },
      models,
    }),
  });

  it('creates an exercise', async () => {
    models.Exercise.create = jest.fn();
    models.Exercise.create.mockResolvedValueOnce(newExerciseMock);
    newExerciseMock.addMuscleGroups = jest.fn();

    models.Exercise.findOne = jest.fn();
    models.Exercise.findOne.mockResolvedValueOnce(createExerciseResponseMock);

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CREATE_EXERCISE,
      variables: {
        input: {
          name: 'new exercise',
          muscleGroups: [1],
        },
      },
    });

    expect(models.Exercise.create).toHaveBeenCalled();
    expect(newExerciseMock.addMuscleGroups).toHaveBeenCalled();
    expect(res.data.createExercise).toEqual(createExerciseResponseMock);
  });

  it('updates an exercise', async () => {
    models.Exercise.update = jest.fn();
    models.Exercise.update.mockResolvedValueOnce(updatedExerciseMock);
    updatedExerciseMock.setMuscleGroups = jest.fn();

    models.Exercise.findOne = jest.fn();
    models.Exercise.findOne.mockResolvedValueOnce(updatedExerciseMock);

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: UPDATE_EXERCISE,
      variables: {
        id: '1',
        input: {
          name: 'update exercise',
          muscleGroups: [2],
        },
      },
    });

    expect(models.Exercise.update).toHaveBeenCalled();
    expect(updatedExerciseMock.setMuscleGroups).toHaveBeenCalled();
    expect(res.data.updateExercise).toEqual({
      name: 'updated exercise',
      muscleGroups: [{ id: '1', name: 'chest' }],
    });
  });

  it('deletes an exercise', async () => {
    models.Exercise.findOne = jest.fn();
    models.Exercise.findOne.mockResolvedValueOnce(newExerciseMock);
    newExerciseMock.destroy = jest.fn();

    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: DELETE_EXERCISE,
      variables: {
        id: '1',
      },
    });

    expect(newExerciseMock.destroy).toHaveBeenCalled();
    expect(res.data.deleteExercise).toBeTruthy();
  });
});
