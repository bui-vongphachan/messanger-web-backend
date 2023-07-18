import { sendMessage } from "./sendMessage";
import { getMessages } from "./getMessages";
import { newMessageSubscriber } from "./newMessageSubscriber";
import { readMessages } from "./readMessages";
import { getPreviousMessages } from "./getPreviousMessages";

export const message = {
  Query: { getMessages, getPreviousMessages },
  Mutation: { sendMessage, readMessages },
  Subscription: { newMessageSubscriber },
};
