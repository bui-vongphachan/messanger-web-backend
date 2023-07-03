import { gql } from "apollo-server";
import { ObjectId, WithId } from "mongodb";

export interface Message {
  _id: string;
  conversationId: string | ObjectId;
  content: string;
  senderId?: string | ObjectId;
}

export interface NewMessageSubscriberPayload {
  newMessageSubscriber: Message | WithId<Message>;
}

export const messageGQL = gql`
  type Message {
    _id: ID
    conversationId: ID
    content: String
    senderId: ID
  }
  type Query {
    getMessages(conversationId: ID): [Message]
  }
  type Mutation {
    sendMessage(
      conversationId: ID
      senderId: ID
      recipientId: ID
      content: String
    ): Boolean
  }
  type Subscription {
    newMessageSubscriber: Message
  }
`;
