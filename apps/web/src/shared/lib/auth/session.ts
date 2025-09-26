/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import type { SessionOptions } from "iron-session";
import { env } from "../env";
import type { RoleMap } from "../role-map";

const Millisec = 1000;

export const MAX_AGE = 24 * 60 * 60 * Millisec;

export type SessionData = {
  access_token?: string;
  id?: string;
  email?: string;
  full_name?: string;
  isLoggedIn: boolean;
  role?: keyof typeof RoleMap;
  expiresAt?: number;
};
export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: env.SESSION_PASSWORD,
  cookieName: "session-cookie",
  cookieOptions: {
    maxAge: MAX_AGE - 60 * Millisec,
    secure: true,
  },
};
