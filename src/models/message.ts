import { gql } from "apollo-server";

export interface Message {
  _id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewMessageSubscriberPayload {
  newMessageSubscriber: Message;
}

export const messageGQL = gql`
  type Message {
    _id: String
    senderId: String
    recipientId: String
    content: String
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getMessages(recipient: String): [Message]
  }
  type Mutation {
    sendMessage(senderId: String, recipientId: String, content: String): String
  }
  type Subscription {
    newMessageSubscriber: Message
  }
`;
