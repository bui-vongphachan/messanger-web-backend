import { pubsub } from "../../helpers";
import { withFilter } from "graphql-subscriptions";
import { PUBSUB_NEW_MESSAGES } from "../../constrains";
import { NewMessageSubscriberPayload } from "../../models";

export const newMessageSubscriber = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(PUBSUB_NEW_MESSAGES),
    (
      payload: NewMessageSubscriberPayload,
      args: { userId: string; partnerId: string }
    ) => {
      const { recipientId, senderId } = payload.newMessageSubscriber;
      const { userId, partnerId } = args;

      if (recipientId.toString() !== userId) return false;

      if (senderId.toString() !== partnerId) return false;

      return true;
    }
  ),
};
