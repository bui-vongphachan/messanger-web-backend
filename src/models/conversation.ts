import { gql } from "apollo-server";
import { ObjectId } from "mongodb";

export interface Conversation {
  _id: string | ObjectId;
  senderId: string;
  recipientId: string;
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
    content: String
    createdAt: Date
    updatedAt: Date
  }
  type Query {
    getConversations(userId: ID): [Conversation]
  }
  type Subscription {
    newConversationSubscriber(userId: ID): Conversation
  }
`;
