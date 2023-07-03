import { gql } from "apollo-server";

export interface User {
  _id: string;
  email: string;
  name: string;
  image: string;
}

export const userGQL = gql`
  type User {
    _id: String
    email: String
    name: String
    image: String
  }
  type Query {
    getUsers(userId: String): [User]
  }
`;
