import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import resolvers from "./resolvers";
import schema from "./schema";

const app = express();
const PORT = process.env.PORT || 8082;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Provide resolver functions for your schema fields

const server = new ApolloServer({ typeDefs: schema, resolvers });

const path = "/graphql";
server.applyMiddleware({ app, path });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8082${server.graphqlPath}`)
);
