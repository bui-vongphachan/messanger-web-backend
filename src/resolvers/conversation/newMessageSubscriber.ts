import { pubsub } from "../../helpers";
import { withFilter } from "graphql-subscriptions";
import { PUBSUB_NEW_MESSAGES } from "../../constants";
import { NewConversationSubscriberPayload } from "../../models";

export const newConversationSubscriber = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(PUBSUB_NEW_MESSAGES),
    (payload: NewConversationSubscriberPayload, args: { userId: string }) => {
      return true;
    }
  ),
};
