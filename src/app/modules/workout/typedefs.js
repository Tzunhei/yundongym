import { gql } from 'apollo-server';

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  directive @hasRole(roles: [Role!]) on FIELD_DEFINITION

  type Query {
    myWorkouts: [Workout!] @auth
    getWorkoutById(id:ID!): Workout!
    getWorkoutByUserId(userId: ID!): Workout!
  }

  type Mutation {
    
  }

  type Workout {
    id: ID
    name: String
    duration: String
    date: String
    sets: [Set!]
  }

  type Set {
    id: ID
    numberOfSets: Int
    repetitions: [Int!]
    duration: String
    weight: [Int!]
    exercise: Exercise
  }

  type Exercise {
    id: ID
    name: String
    muscleGroup: [MuscleGroup!]
  }

  type MuscleGroup {
    id: ID
    name: String
  }

`;

export default typeDefs;
