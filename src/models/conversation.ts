import { gql } from "apollo-server";
import { ObjectId } from "mongodb";

export interface Conversation {
  _id: ObjectId;
  senderId: ObjectId;
  recipientId: ObjectId;
  lastMessage: string;
}

export interface NewConversationSubscriberPayload {
  newConversationSubscriber: Conversation;
}

export const conversationGQL = gql`
  type Conversation {
    _id: String
    senderId: ID
    recipientId: ID
    lastMessage: String
  }
  type Query {
    getConversations(userId: ID): [Conversation]
  }
  type Subscription {
    newConversationSubscriber(userId: ID): Conversation
  }
`;
