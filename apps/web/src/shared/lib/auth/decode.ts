/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import * as jose from "jose";
import type { RoleMap } from "../role-map";

type User = {
  id: string;
  email: string;
  full_name: string;
  role: RoleMap;
};

type TokenPayload = {
  sub: string;
  exp: number;
  user: User;
};

export function decodeToken(token: string): TokenPayload {
  return jose.decodeJwt(token);
}
