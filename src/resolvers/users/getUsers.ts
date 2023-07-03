import { ObjectId } from "mongodb";
import { COLLECTION_USERS } from "../../constants";
import { clientPromise } from "../../helpers";
import { User } from "../../models/user";

export const getUsers = async (_: any, args: { userId: string }) => {
  const mongoClient = await clientPromise;

  const items = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<User[]>(COLLECTION_USERS)
    .find({ _id: { $ne: new ObjectId(args.userId) } })
    .toArray();

  return items;
};
