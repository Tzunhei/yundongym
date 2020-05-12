import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { AuthenticationError } from 'apollo-server';
import { verify } from 'jsonwebtoken';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const [, , context] = args;
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthenticationError({ message: 'No authorization token.' });
      }
      const token = context.headers.authorization;
      try {
        const id_token = token.replace('Bearer ', '');
        await verify(id_token, process.env.JWT_SECRET);

        const result = await resolve.apply(this, args);

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
