import { gql } from "apollo-server";
import { messageGQL, userGQL } from "./models";

export const typeDefs = [
  gql`
    scalar Timestamp
  `,
  messageGQL,
  userGQL,
];
