import { MongoClient, ObjectId, WithId } from "mongodb";
import { COLLECTION_MESSAGES } from "../../../constrains";
import { Message, SendMessageArgs } from "../../../models";

export const createMessage = async (props: {
  mongoClient: MongoClient;
  args: SendMessageArgs;
  previousMessage: WithId<Message> | null;
}) => {
  const { mongoClient, args, previousMessage } = props;

  const newObjectId = new ObjectId();

  const result = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Partial<Message>>(COLLECTION_MESSAGES)
    .insertOne({
      _id: newObjectId,
      content: args.content,
      senderId: new ObjectId(args.senderId!),
      recipientId: new ObjectId(args.recipientId!),
      previousMessageId: previousMessage?._id || null,
      sentDate: newObjectId.getTimestamp(),
      isRead: false,
    });

  return await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .findOne({ _id: result.insertedId });
};
