import path from 'path';
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'apollo-server';

const typesArray = fileLoader(path.join(__dirname, './**/typeDef.js'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, './**/resolvers.js'));
const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { schema };
