import { ObjectId } from "mongodb";
import { COLLECTION_MESSAGES } from "../../constants";
import { clientPromise } from "../../helpers";
import { Message } from "../../models";

export const readMessages = async (
  _: any,
  args: Partial<{
    senderId: string;
    recipientId: string;
  }>
) => {
  const mongoClient = await clientPromise;

  const result = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .updateMany(
      {
        senderId: new ObjectId(args.senderId),
        recipientId: new ObjectId(args.recipientId),
      },
      { $set: { isRead: true } }
    );

  return result.acknowledged;
};
