import { COLLECTION_CONVERSATIONS } from "../../constants";
import { clientPromise } from "../../helpers";
import { Conversation } from "../../models";

export const getConversations = async (_: any, args: { userId: string }) => {
  const mongoClient = await clientPromise;

  const items = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Conversation>(COLLECTION_CONVERSATIONS)
    .find(args)
    .sort({ _id: -1 })
    .limit(50)
    .toArray();

  return items.reverse();
};
