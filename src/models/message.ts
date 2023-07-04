import { gql } from "apollo-server";
import { ObjectId, WithId } from "mongodb";

export interface Message {
  _id: ObjectId;
  content: string;
  senderId: string | ObjectId;
  recipientId: string | ObjectId;
  sentDate: Date;
  isRead: boolean;
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
    sentDate: Timestamp
    isRead: Boolean
  }
  type Query {
    getMessages(userId: ID, partnerId: ID): [Message]
  }
  type Mutation {
    sendMessage(senderId: ID, recipientId: ID, content: String): Message
    readMessages(senderId: ID, recipientId: ID): Boolean
  }
  type Subscription {
    newMessageSubscriber(userId: ID): Message
  }
`;
