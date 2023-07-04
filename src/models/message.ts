import { gql } from "apollo-server";
import { ObjectId, WithId } from "mongodb";

export interface Message {
  _id: string;
  content: string;
  senderId: string | ObjectId;
  recipientId: string | ObjectId;
}

export interface NewMessageSubscriberPayload {
  newMessageSubscriber: Message | WithId<Message>;
}

export const messageGQL = gql`
  type Message {
    _id: ID
    content: String
    senderId: ID
    recipientId: ID
  }
  type Query {
    getMessages(userId: ID, partnerId: ID): [Message]
  }
  type Mutation {
    sendMessage(senderId: ID, recipientId: ID, content: String): Message
  }
  type Subscription {
    newMessageSubscriber(userId: ID): Message
  }
`;
