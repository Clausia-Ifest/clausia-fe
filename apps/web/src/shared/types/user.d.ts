/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import type { RoleMap } from "../lib/role-map";

export type Role = keyof typeof RoleMap;

export type User = {
  id: string;
  full_name: string;
  email: string;
  role: keyof typeof RoleMap;
};
