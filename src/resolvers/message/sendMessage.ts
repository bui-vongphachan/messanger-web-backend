import { MongoClient, ObjectId } from "mongodb";
import {
  COLLECTION_MESSAGES,
  COLLECTION_USERS,
  PUBSUB_NEW_MESSAGES,
  PUBSUB_UNREAD_CONVERSATION,
} from "../../constants";
import { pubsub } from "../../helpers";
import { clientPromise } from "../../helpers";
import {
  Message,
  NewMessageSubscriberPayload,
  SendMessageArgs,
  UnreadConversationSubscriberPayload,
  User,
} from "../../models";

export const sendMessage = async (_: any, args: SendMessageArgs) => {
  try {
    const mongoClient = await clientPromise;

    const user = await checkUser({
      mongoClient,
      userId: args.senderId,
    });

    const message = await createMessage({
      mongoClient,
      args,
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

const checkUser = async (props: {
  mongoClient: MongoClient;
  userId?: string;
}) => {
  const { mongoClient, userId } = props;

  const user = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<User>(COLLECTION_USERS)
    .findOne({ _id: new ObjectId(userId) });

  if (!user) throw new Error("User not found");

  return user;
};

const createMessage = async (props: {
  mongoClient: MongoClient;
  args: SendMessageArgs;
}) => {
  const { mongoClient, args } = props;

  const newObjectId = new ObjectId();

  const result = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Message>>(COLLECTION_MESSAGES)
    .insertOne({
      _id: newObjectId,
      content: args.content!,
      senderId: new ObjectId(args.senderId!),
      recipientId: new ObjectId(args.recipientId!),
      previousMessageId: args.previousMessageId
        ? new ObjectId(args.previousMessageId)
        : null,
      sentDate: newObjectId.getTimestamp(),
      isRead: false,
    });

  return await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .findOne({ _id: result.insertedId });
};
