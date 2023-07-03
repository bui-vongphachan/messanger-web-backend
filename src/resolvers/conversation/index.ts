import { getConversations } from "./getMessages";
import { newConversationSubscriber } from "./newMessageSubscriber";

export const conversation = {
  Query: { getConversations },
  Subscription: { newConversationSubscriber },
};
