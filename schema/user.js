import { gql } from "apollo-server-express";

export default gql`
  type Token {
    token: String!
  }
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
  type Query {
    user(id: ID!): User
    users: [User]
    currentUser: User
  }
  type Mutation {
    signupUser(
      firstName: String!
      lastName: String!
      email: String!
      userName: String!
      password: String!
    ): Token

    signinUser(email: String!, password: String!): Token

    editProfile(email: String!, bio: String!): User

    setProfileIMG(email: String!, profileImage: String!): User

    changeEmail(currentEmail: String!, newEmail: String!): User

    changePassword(email: String!, password: String!): User

    passwordReset(email: String!): User
  }
`;
