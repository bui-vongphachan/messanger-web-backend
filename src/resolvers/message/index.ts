import { sendMessage } from "./sendMessage";
import { getMessages } from "./getMessages";
import { newMessageSubscriber } from "./newMessageSubscriber";
import { readMessages } from "./readMessages";

export const message = {
  Query: { getMessages },
  Mutation: { sendMessage, readMessages },
  Subscription: { newMessageSubscriber },
};
