import { gql } from "apollo-server";
import { ObjectId, WithId } from "mongodb";

export interface Message {
  _id: string;
  conversationId: string | ObjectId;
  content: string;
}

export interface NewMessageSubscriberPayload {
  newMessageSubscriber: Message | WithId<Message>;
}

export const messageGQL = gql`
  type Message {
    _id: String
    conversationId: ID
    content: String
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
