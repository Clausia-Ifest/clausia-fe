/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import type { User } from "@/shared/types/user";

export type LoginResponse = {
  access_token: string;
  user: User;
};
