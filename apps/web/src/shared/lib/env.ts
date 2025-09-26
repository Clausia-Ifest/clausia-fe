/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string().min(1),
  SESSION_PASSWORD: z.string().min(24),
});

let cached: z.infer<typeof envSchema> | null = null;

export function getEnv() {
  if (!cached) {
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }
    cached = parsed.data;
  }
  return cached;
}

export const env = getEnv();

export type Env = z.infer<typeof envSchema>;
