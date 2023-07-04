import { gql } from "apollo-server";
import { ObjectId, WithId } from "mongodb";
import { Message } from "./message";

export interface User {
  _id: ObjectId;
  email: string;
  name: string;
  image: string;
}

export interface UnreadConversationSubscriberPayload {
  unreadConversation: {
    user: User | WithId<User>;
    latestMessage: Message;
  };
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
  type Subscription {
    unreadConversation(userId: ID): UserWithLatestMessage
  }
`;
