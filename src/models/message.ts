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
    senderId: ID
    recipientId: ID
    content: String
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getMessages(recipientId: ID): [Message]
  }
  type Mutation {
    sendMessage(senderId: ID, recipientId: ID, content: String): Boolean
  }
  type Subscription {
    newMessageSubscriber: Message
  }
`;
