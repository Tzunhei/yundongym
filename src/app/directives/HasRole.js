import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';
import { AuthenticationError, ForbiddenError } from 'apollo-server';
import { verify } from 'jsonwebtoken';

class HasRoleDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve: resolver = defaultFieldResolver } = field;

    const { roles } = this.args;

    field.resolve = async function (...args) {
      const [, , context] = args;
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthenticationError({ message: 'No authorization token.' });
      }
      const token = context.headers.authorization;
      try {
        const id_token = token.replace('Bearer ', '');
        const { role } = await verify(id_token, process.env.JWT_SECRET);

        if (!roles.includes(role)) {
          throw new ForbiddenError(
            `Your role ${role} does not authorize you to perform this operation`,
          );
        }

        const result = await resolver.apply(this, args);

        return result;
      } catch (error) {
        console.log(error);
        throw new ForbiddenError(error.message);
      }
    };
  }
}

export { HasRoleDirective };
