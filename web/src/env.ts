import { z } from "zod";

/** Marketing site only links out to docs; no API client. */
const clientEnvSchema = z.object({
  VITE_DOCS_URL: z.string().url(),
});

export const env = clientEnvSchema.parse({
  VITE_DOCS_URL: import.meta.env.VITE_DOCS_URL ?? "http://localhost:5174",
});
