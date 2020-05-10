import path from 'path';
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas';
import { makeExecutableSchema } from 'apollo-server';
import { IsAuthenticatedDirective, HasRoleDirective } from './directives';

const typesArray = fileLoader(path.join(__dirname, './modules/**/typeDef.js'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(
  path.join(__dirname, './modules/**/resolvers.js'),
);
const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: IsAuthenticatedDirective,
    hasRole: HasRoleDirective,
  },
});

export { schema };
