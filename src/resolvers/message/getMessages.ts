import { ObjectId } from "mongodb";
import { COLLECTION_MESSAGES } from "../../constants";
import { clientPromise } from "../../helpers";
import { Message } from "../../models";

export const getMessages = async (_: any, args: Partial<Message>) => {
  const mongoClient = await clientPromise;

  const items = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .find({
      conversationId: new ObjectId(args.conversationId),
    })
    .sort({ _id: -1 })
    .limit(50)
    .toArray();

  return items.reverse();
};
