import { gql } from "apollo-server";
import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
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

  type UserWithLatestMessage {
    user: User
    latestMessage: Message
  }

  type Query {
    getUsers(userId: String): [UserWithLatestMessage]
  }
`;
