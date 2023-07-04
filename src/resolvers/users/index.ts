import { getUsers } from "./getUsers";
import { unreadConversation } from "./unreadConversation";

export const users = {
  Query: { getUsers },
  Mutation: {},
  Subscription: { unreadConversation },
};
