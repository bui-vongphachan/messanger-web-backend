import { message } from "./message";

export interface ResolverContext {
  isAuthenticated: boolean;
  profile: null;
}

export const resolvers = [message];
