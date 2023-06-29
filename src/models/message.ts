import { gql } from "apollo-server";

export interface Message {
  _id: string;
  sender: string;
  recipient: string;
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
    sender: String
    recipient: String
    content: String
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getMessages(recipient: String): [Message]
  }
  type Mutation {
    sendMessage(sender: String, recipient: String, content: String): String
  }
  type Subscription {
    newMessageSubscriber: Message
  }
`;
