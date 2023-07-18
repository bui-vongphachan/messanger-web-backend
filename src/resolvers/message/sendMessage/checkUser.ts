import { MongoClient, ObjectId } from "mongodb";
import { COLLECTION_USERS } from "../../../constrains";
import { User } from "../../../models";

export const checkUser = async (props: {
  mongoClient: MongoClient;
  userId?: string;
}) => {
  const { mongoClient, userId } = props;

  const user = await mongoClient
    .db(process.env.MONGODB_DBNAME)
    .collection<User>(COLLECTION_USERS)
    .findOne({ _id: new ObjectId(userId) });

  if (!user) throw new Error("User not found");

  return user;
};
