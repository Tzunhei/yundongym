import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { AuthenticationError } from 'apollo-server';
import { verify } from 'jsonwebtoken';

class HasRoleDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve: resolver = defaultFieldResolver } = field;

    const { roles } = this.args;

    field.resolve = async function (result, args, context, info) {
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthenticationError({ message: 'No authorization token.' });
      }
      const token = context.headers.authorization;
      try {
        const id_token = token.replace('Bearer ', '');
        const decode = await verify(id_token, process.env.JWT_SECRET);

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

export { HasRoleDirective };
