import { ObjectId } from "mongodb";
import { COLLECTION_MESSAGES } from "../../constants";
import { clientPromise } from "../../helpers";
import { Message } from "../../models";

export const getPreviousMessages = async (
  _: any,
  args: { currentMessageId?: string }
) => {
  if (!args.currentMessageId) return [];

  const mongoClient = await clientPromise;

  const result = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<Message>(COLLECTION_MESSAGES)
    .aggregate([
      {
        $match: { _id: new ObjectId(args.currentMessageId) },
      },
      {
        $graphLookup: {
          from: COLLECTION_MESSAGES,
          startWith: "$previousMessageId",
          connectFromField: "previousMessageId",
          connectToField: "_id",
          maxDepth: 50,
          as: "graphResult",
        },
      },
      {
        $unwind: "$graphResult",
      },
      {
        $sort: {
          "graphResult.sentDate": -1,
        },
      },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$graphResult" },
        },
      },
    ])
    .toArray();

  if (!result.length) return [];

  return result[0].messages;
};
