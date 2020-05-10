import { SchemaDirectiveVisitor } from 'graphql-tools';
import {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
} from 'graphql';
import { AuthenticationError } from 'apollo-server';
import { verify } from 'jsonwebtoken';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'auth',
      locations: [DirectiveLocation.FIELD_DEFINITION],
    });
  }

  visitFieldDefinition(field) {
    const { resolve: resolver = defaultFieldResolver } = field;

    field.resolve = async function (result, args, context, info) {
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthenticationError({ message: 'No authorization token.' });
      }
      const token = context.headers.authorization;
      try {
        const id_token = token.replace('Bearer ', '');
        await verify(id_token, process.env.JWT_SECRET);

        const result = await resolver.apply(this, args);

        return result;
      } catch (error) {
        throw new AuthenticationError({
          message: 'You are not authorized to perform this operation',
        });
      }
    };
  }
}

export { IsAuthenticatedDirective };
