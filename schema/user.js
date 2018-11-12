import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    password: String!
    bio: String
    profileImage: String
    email: String!
    userName: String!
    createdDate: String
  }
`;
