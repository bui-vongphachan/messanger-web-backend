import { pubsub } from "../../helpers";
import { withFilter } from "graphql-subscriptions";
import { PUBSUB_NEW_MESSAGES } from "../../constants";

export const newMessageSubscriber = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(PUBSUB_NEW_MESSAGES),
    (payload: any, _: any) => {
      return true;
    }
  ),
};
