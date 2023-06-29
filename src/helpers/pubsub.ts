import { PubSub } from "graphql-subscriptions";

process.setMaxListeners(30);

export const pubsub = new PubSub();
