import { ObjectId } from "mongodb";
import { COLLECTION_MESSAGES, COLLECTION_USERS } from "../../constrains";
import { clientPromise } from "../../helpers";
import { Message } from "../../models";
import { User } from "../../models/user";

export const getUsers = async (_: any, args: { userId: string }) => {
  const mongoClient = await clientPromise;

  const users = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<User>(COLLECTION_USERS)
    .find({ _id: { $ne: new ObjectId(args.userId) } })
    .toArray();

  const userWithLatestMessage = users.map(async (user) => {
    const latestMessage = await mongoClient
      .db(process.env.MONGODB_DBNAME)
      .collection<Message>(COLLECTION_MESSAGES)
      .findOne(
        {
          $or: [
            {
              senderId: new ObjectId(user._id),
              recipientId: new ObjectId(args.userId),
            },
            {
              senderId: new ObjectId(args.userId),
              recipientId: new ObjectId(user._id),
            },
          ],
        },
        {
          sort: { _id: -1 },
        }
      );

    return {
      user,
      latestMessage,
    };
  });

  const userWithMessages = await Promise.all(userWithLatestMessage);

  return userWithMessages.sort((a, b) => {
    if (a.latestMessage === null && b.latestMessage === null) {
      return 0;
    } else if (a.latestMessage === null) {
      return 1;
    } else if (b.latestMessage === null) {
      return -1;
    } else {
      return (
        new Date(b.latestMessage.sentDate).getTime() -
        new Date(a.latestMessage.sentDate).getTime()
      );
    }
  });
};
