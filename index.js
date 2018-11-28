import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import schema from "./schema";
import jwt from "jsonwebtoken";
import models, { sequelize } from "./models";
import { AuthenticationError } from "apollo-server";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("build/public"));
const getUser = async req => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models
      };
    }

    if (req) {
      const currentUser = await getUser(req);
      return {
        models,
        currentUser,
        secret: process.env.SECRET
      };
    }
  }
});
server.applyMiddleware({ app, path: "/graphql" });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

sequelize.sync().then(async () => {
  httpServer.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  );
});
