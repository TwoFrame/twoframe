import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  // Get process environement var as string
  dbCredentials: {
    url: process.env.DATABASE_URL! as string,
  },
  strict: true,
  verbose: true,
});