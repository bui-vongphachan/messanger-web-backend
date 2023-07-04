import { MongoClient, ObjectId } from "mongodb";
import { COLLECTION_MESSAGES, PUBSUB_NEW_MESSAGES } from "../../constants";
import { pubsub } from "../../helpers";
import { clientPromise } from "../../helpers";
import { Message, NewMessageSubscriberPayload } from "../../models";

interface Args extends Message {
  senderId: string;
  recipientId: string;
}

export const sendMessage = async (_: any, args: Partial<Args>) => {
  try {
    const mongoClient = await clientPromise;

    const message = await createMessage({
      mongoClient,
      args,
    });

    const newMessagePayload: NewMessageSubscriberPayload = {
      newMessageSubscriber: message!,
    };

    await pubsub.publish(PUBSUB_NEW_MESSAGES, newMessagePayload);

    return message;
  } catch (error) {
    return error;
  }
};

const createMessage = async (props: {
  mongoClient: MongoClient;
  args: Partial<Args>;
}) => {
  const { mongoClient, args } = props;

  const result = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Message>>(COLLECTION_MESSAGES)
    .insertOne({
      content: args.content!,
      senderId: new ObjectId(args.senderId!),
      recipientId: new ObjectId(args.recipientId!),
    });

  return await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .findOne({ _id: result.insertedId });
};
