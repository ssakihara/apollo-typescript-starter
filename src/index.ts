import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

const main = async () => {
  await createConnection();

  const app = express();

  const schema = await buildSchema({
    resolvers: [path.resolve() + '/entity/**/*.ts'],
  });

  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  );
};

main();
