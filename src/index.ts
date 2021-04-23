import 'reflect-metadata';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

const env: string = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';
const connectOption = require(`../ormconfig.${env}.json`);

const main = async () => {
    await createConnection(connectOption);

  const app = express();
  app.use(
    cors({
      origin: '*',
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );

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
