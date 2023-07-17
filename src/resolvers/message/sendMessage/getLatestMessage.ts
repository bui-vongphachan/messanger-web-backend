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
        senderId: new ObjectId(args.senderId!),
        recipientId: new ObjectId(args.recipientId!),
      },
      {
        sort: { _id: -1 },
      }
    );
};
