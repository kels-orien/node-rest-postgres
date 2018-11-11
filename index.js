import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
const app = express();
const PORT = process.env.PORT || 8082;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const path = "/graphql";
server.applyMiddleware({ app, path });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8082${server.graphqlPath}`)
);
