import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLDirective } from 'graphql-upload/node_modules/graphql';
import { DirectiveLocation } from 'graphql';
import { AuthenticationError } from 'apollo-server';
import { verify } from 'jsonwebtoken';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName, schema) {
    return new GraphQLDirective({
      name: 'auth',
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
    });
  }

  visitFieldDefinition(field) {
    field.resolve = async function (result, args, context, info) {
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthenticationError({ message: 'No authorization token.' });
      }
      const token = context.headers.authorization;
      try {
        const id_token = token.replace('Bearer ', '');
        await verify(id_token, process.env.JWT_SECRET);

        return result[field.name];
      } catch (error) {
        throw new AuthenticationError({
          message: 'You are not authorized to perform this operation',
        });
      }
    };
  }
}

export { IsAuthenticatedDirective };
