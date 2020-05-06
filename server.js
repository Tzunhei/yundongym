const { ApolloServer } = require('apollo-server');

const server = new ApolloServer();

console.log('hello');

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
