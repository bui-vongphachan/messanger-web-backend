import { gql } from "apollo-server";
import { conversationGQL, messageGQL, userGQL } from "./models";

export const typeDefs = [
  gql`
    scalar Date
  `,
  messageGQL,
  conversationGQL,
  userGQL,
];
