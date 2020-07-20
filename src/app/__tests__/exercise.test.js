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

const allExercisesMock = [
  {
    id: '1',
    name: 'exercise 1',
    muscleGroups: [
      {
        id: '1',
        name: 'chest',
      },
    ],
  },
];

let server;

beforeAll(() => {
  server = new ApolloServer({
    schema,
    context: () => ({
      headers: 'Bearer 1',
      loggedUser: { id: 1, email: 'test@email.com' },
      models,
    }),
  });
});

describe('query exercises', () => {
  it('queries all exercises', async () => {
    models.Exercise.findAll = jest.fn();
    models.Exercise.findAll.mockReturnValueOnce(allExercisesMock);
    const { query } = createTestClient(server);
    const res = await query({ query: GET_ALL_EXERCISES });

    expect(res.data.getExercises).toEqual(allExercisesMock);
  });
});
