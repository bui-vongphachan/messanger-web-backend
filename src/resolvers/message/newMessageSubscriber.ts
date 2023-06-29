import { pubsub } from "../../helpers";
import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGES } from "../../constants";

export const newMessageSubscriber = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(NEW_MESSAGES),
    (payload: any, _: any) => {
      return true;
    }
  ),
};
