import { ObjectId } from "mongodb";
import { COLLECTION_MESSAGES, MESSAGE_QUERY_LIMIT } from "../../constrains";
import { clientPromise } from "../../helpers";
import { Message } from "../../models";

export const getMessages = async (
  _: any,
  args: Partial<{
    userId: string;
    partnerId: string;
  }>
) => {
  const mongoClient = await clientPromise;

  const items = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .find({
      $or: [
        {
          senderId: new ObjectId(args.userId),
          recipientId: new ObjectId(args.partnerId),
        },
        {
          senderId: new ObjectId(args.partnerId),
          recipientId: new ObjectId(args.userId),
        },
      ],
    })
    .sort({ _id: -1 })
    .limit(MESSAGE_QUERY_LIMIT)
    .toArray();

  return {
    isEndOfConversation: items.length < MESSAGE_QUERY_LIMIT,
    messages: items,
  };
};
