import { gql } from "apollo-server";
import { messageGQL } from "./models";

export const typeDefs = [
  gql`
    scalar Date
  `,
  messageGQL,
];
