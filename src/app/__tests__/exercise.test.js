import { v4 as uuidv4 } from 'uuid';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server';
import { schema } from 'app/schema';
import { sequelize } from 'db/models';

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
  mutation createExercise($input: exerciseInput) {
    createExercise(input: $input) {
      name
      muscleGroups {
        id
        name
      }
    }
  }
`;

const allExercisesMock = [
  {
    id: uuidv4(),
    name: 'exercise 1',
    muscleGroups: [
      {
        id: '1',
        name: 'chest',
      },
    ],
  },
];

describe('query exercises', () => {
  it('queries all exercises', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        headers: 'Bearer 1',
        loggedUser: { id: 1, email: 'test@email.com' },
        models,
      }),
    });

    models.Exercise.findAll = jest.fn();
    models.Exercise.findAll.mockReturnValueOnce(allExercisesMock);
    const { query } = createTestClient(server);
    const res = await query({ query: GET_ALL_EXERCISES });

    expect(models.Exercise.findAll).toHaveBeenCalled();
    expect(res.data.getExercises).toEqual(allExercisesMock);
  });

  it('get exercise by id', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        headers: 'Bearer 1',
        loggedUser: { id: 1, email: 'test@email.com' },
        models,
      }),
    });
    models.Exercise.findOne = jest.fn();
    models.Exercise.findOne.mockReturnValueOnce(allExercisesMock[0]);

    const { query } = createTestClient(server);
    const res = await query({
      query: GET_EXERCISE,
      variables: { id: allExercisesMock[0].id },
    });

    expect(models.Exercise.findOne).toHaveBeenCalled();

    expect(res.data.getExerciseById).toEqual(allExercisesMock[0]);
  });

  it('creates an exercise', async () => {
    const server = new ApolloServer({
      schema,
      context: () => ({
        headers: 'Bearer 1',
        loggedUser: { id: 1, email: 'test@email.com' },
        models,
      }),
    });

    models.Exercise.create = jest.fn();
    models.Exercise.create.mockReturnValueOnce({
      name: 'new exercise',
      muscleGroups: [
        {
          id: '1',
          name: 'chest',
        },
      ],
    });
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: CREATE_EXERCISE,
      variables: {
        name: 'new exercise',
        muscleGroups: [1],
      },
    });
    expect(models.Exercise.create).toHaveBeenCalled();
    // expect(res.data.createExercise).toEqual()
  });
});
