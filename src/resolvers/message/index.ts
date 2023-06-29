import { sendMessage } from "./sendMessage";
import { getMessages } from "./getMessages";
import { newMessageSubscriber } from "./newMessageSubscriber";

export const message = {
  Query: { getMessages },
  Mutation: { sendMessage },
  Subscription: { newMessageSubscriber },
};
