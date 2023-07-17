import { pubsub } from "../../helpers";
import { withFilter } from "graphql-subscriptions";
import { PUBSUB_UNREAD_CONVERSATION } from "../../constrains";
import { UnreadConversationSubscriberPayload } from "../../models";

export const unreadConversation = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(PUBSUB_UNREAD_CONVERSATION),
    (
      payload: UnreadConversationSubscriberPayload,
      args: { userId: string }
    ) => {
      if (
        payload.unreadConversation.latestMessage.recipientId.toString() ===
        args.userId
      )
        return true;

      return false;
    }
  ),
};
