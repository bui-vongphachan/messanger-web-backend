import { MongoClient, ObjectId } from "mongodb";
import { COLLECTION_MESSAGES } from "../../../constrains";
import { Message, SendMessageArgs } from "../../../models";

export const getLatestMessage = async (props: {
  mongoClient: MongoClient;
  args: SendMessageArgs;
}) => {
  const { mongoClient, args } = props;

  return await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .findOne(
      {
        $or: [
          {
            senderId: new ObjectId(args.senderId),
            recipientId: new ObjectId(args.recipientId),
          },
          {
            senderId: new ObjectId(args.recipientId),
            recipientId: new ObjectId(args.senderId),
          },
        ],
      },
      {
        sort: { _id: -1 },
      }
    );
};
