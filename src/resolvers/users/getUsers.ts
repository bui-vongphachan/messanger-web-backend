import { ObjectId } from "mongodb";
import { COLLECTION_CONVERSATIONS, COLLECTION_USERS } from "../../constants";
import { clientPromise } from "../../helpers";
import { Conversation } from "../../models";
import { User } from "../../models/user";

export const getUsers = async (_: any, args: { userId: string }) => {
  const mongoClient = await clientPromise;

  const conversations = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Conversation>(COLLECTION_CONVERSATIONS)
    .find({
      $or: [
        { senderId: new ObjectId(args.userId) },
        { recipientId: new ObjectId(args.userId) },
      ],
    })
    .toArray();

  const items = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<User>(COLLECTION_USERS)
    .find({ _id: { $ne: new ObjectId(args.userId) } })
    .toArray();

  return items.map((item) => {
    const conversation = conversations.find((conversation) => {
      return (
        conversation.senderId.toString() === item._id.toString() ||
        conversation.recipientId.toString() === item._id.toString()
      );
    });

    return {
      user: item,
      conversation,
    };
  });
};
