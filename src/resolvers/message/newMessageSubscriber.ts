import { pubsub } from "../../helpers";
import { withFilter } from "graphql-subscriptions";
import { PUBSUB_NEW_MESSAGES } from "../../constants";
import { NewMessageSubscriberPayload } from "../../models";

export const newMessageSubscriber = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(PUBSUB_NEW_MESSAGES),
    (payload: NewMessageSubscriberPayload, args: { userId: string }) => {
      if (
        payload.newMessageSubscriber.recipientId.toString() === args.userId ||
        payload.newMessageSubscriber.recipientId.toString() === args.userId
      )
        return true;

      return false;
    }
  ),
};
