import {
  PUBSUB_NEW_MESSAGES,
  PUBSUB_UNREAD_CONVERSATION,
} from "../../../constants";
import { pubsub } from "../../../helpers";
import { clientPromise } from "../../../helpers";
import {
  NewMessageSubscriberPayload,
  SendMessageArgs,
  UnreadConversationSubscriberPayload,
  User,
} from "../../../models";
import { checkUser } from "./checkUser";
import { createMessage } from "./createMessage";
import { getLatestMessage } from "./getLatestMessage";

export const sendMessage = async (_: any, args: SendMessageArgs) => {
  try {
    const mongoClient = await clientPromise;

    const user = await checkUser({
      mongoClient,
      userId: args.senderId,
    });

    const previousMessage = await getLatestMessage({
      mongoClient,
      args,
    });

    const message = await createMessage({
      mongoClient,
      args,
      previousMessage,
    });

    const newMessagePayload: NewMessageSubscriberPayload = {
      newMessageSubscriber: message!,
    };

    const unreadConversationPayload: UnreadConversationSubscriberPayload = {
      unreadConversation: {
        user,
        latestMessage: message!,
      },
    };

    await pubsub.publish(PUBSUB_NEW_MESSAGES, newMessagePayload);

    await pubsub.publish(PUBSUB_UNREAD_CONVERSATION, unreadConversationPayload);

    return message;
  } catch (error) {
    return error;
  }
};
