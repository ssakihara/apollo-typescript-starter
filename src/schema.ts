import { makeExecutableSchema } from 'apollo-server-express';
import * as schemas from 'schemas';

const BaseQuery = `
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

const executableSchema: any = Object.values(schemas).reduce(
  (builder: any, schema: any) => {
    builder.typeDefs = [...builder.typeDefs, schema.typeDef];
    builder.resolvers = [...builder.resolvers, schema.resolvers];
    return builder;
  },
  {
    typeDefs: [BaseQuery],
    resolvers: [],
  }
);

export default makeExecutableSchema(executableSchema);
