import { COLLECTION_MESSAGES, NEW_MESSAGES } from "../../constants";
import { pubsub } from "../../helpers";
import { clientPromise } from "../../helpers";
import { Message, NewMessageSubscriberPayload } from "../../models";

export const sendMessage = async (_: any, args: Message) => {
  try {
    const mongoClient = await clientPromise;

    const result = await mongoClient
      .db(process.env.MONGODB_DBNAME)
      .collection<Message>(COLLECTION_MESSAGES)
      .insertOne(args);

    const newMessage = await mongoClient
      .db(process.env.MONGODB_DBNAME)
      .collection<Message>(COLLECTION_MESSAGES)
      .findOne({ _id: result.insertedId });

    if (newMessage) {
      const payload: NewMessageSubscriberPayload = {
        newMessageSubscriber: newMessage,
      };

      await pubsub.publish(NEW_MESSAGES, payload);
    }

    return true;
  } catch (error) {
    return error;
  }
};
