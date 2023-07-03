import { MongoClient, ObjectId, WithId } from "mongodb";
import {
  COLLECTION_CONVERSATIONS,
  COLLECTION_MESSAGES,
  PUBSUB_NEW_MESSAGES,
  PUBSUB_NEW_CONVERSATION,
} from "../../constants";
import { pubsub } from "../../helpers";
import { clientPromise } from "../../helpers";
import {
  Conversation,
  Message,
  NewMessageSubscriberPayload,
  NewConversationSubscriberPayload,
} from "../../models";

interface Args extends Message {
  senderId: string;
  recipientId: string;
}

export const sendMessage = async (_: any, args: Partial<Args>) => {
  try {
    const mongoClient = await clientPromise;

    const conversation = await checkConversation({ mongoClient, args });

    const message = await createMessage({
      mongoClient,
      args,
      conversation: conversation!,
    });

    await updateLastMessage({ mongoClient, args, conversation: conversation! });

    const newMessagePayload: NewMessageSubscriberPayload = {
      newMessageSubscriber: message!,
    };

    const newConversatoinPayload: NewConversationSubscriberPayload = {
      newConversationSubscriber: conversation! as Conversation,
    };

    await pubsub.publish(PUBSUB_NEW_MESSAGES, newMessagePayload);
    await pubsub.publish(PUBSUB_NEW_CONVERSATION, newConversatoinPayload);

    return true;
  } catch (error) {
    return error;
  }
};

const checkConversation = async (props: {
  mongoClient: MongoClient;
  args: Partial<Args>;
}) => {
  const { mongoClient, args } = props;

  const conversation = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Conversation>>(COLLECTION_CONVERSATIONS)
    .findOne({ _id: new ObjectId(args.conversationId) });

  if (conversation) return conversation;

  const result = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Conversation>>(COLLECTION_CONVERSATIONS)
    .insertOne({
      senderId: new ObjectId(args.senderId!),
      recipientId: new ObjectId(args.recipientId!),
      lastMessage: args.content,
    });

  return await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Conversation>>(COLLECTION_CONVERSATIONS)
    .findOne({ _id: new ObjectId(result.insertedId) });
};

const createMessage = async (props: {
  mongoClient: MongoClient;
  args: Partial<Args>;
  conversation: Conversation | Partial<Conversation> | WithId<Conversation>;
}) => {
  const { mongoClient, args, conversation } = props;

  const result = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Message>>(COLLECTION_MESSAGES)
    .insertOne({
      conversationId: conversation._id,
      content: args.content!,
      senderId: new ObjectId(args.senderId!),
    });

  return await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .findOne({ _id: result.insertedId });
};

const updateLastMessage = async (props: {
  mongoClient: MongoClient;
  args: Partial<Args>;
  conversation: Conversation | Partial<Conversation> | WithId<Conversation>;
}) => {
  const { mongoClient, args, conversation } = props;

  await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Conversation>>(COLLECTION_CONVERSATIONS)
    .updateOne(
      { _id: new ObjectId(conversation._id) },
      { $set: { lastMessage: args.content } }
    );
};
