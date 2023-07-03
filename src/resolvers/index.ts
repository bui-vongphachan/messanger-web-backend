import { message } from "./message";
import { users } from "./users";

export interface ResolverContext {
  isAuthenticated: boolean;
  profile: null;
}

export const resolvers = [message, users];
