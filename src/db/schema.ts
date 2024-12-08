import { pgTable, uuid, text, timestamp, smallint, pgSchema, serial } from "drizzle-orm/pg-core";

const authSchema = pgSchema('auth');

const users = authSchema.table('users', {
	id: uuid('id').primaryKey(),
});

export const profiles = pgTable('profiles', {
	id: serial('id').primaryKey(),
	username: text('username').notNull(),
	user_id: uuid('user_id').references(() => users.id).notNull()
});

export const TournamentTable = pgTable("tournaments", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // owner_id: uuid('owner_id').references(() => UserTable.id).notNull(), change this later
  owner_id: uuid("owner_id").notNull(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  start_date: timestamp("start_date", { mode: "string" }).notNull(),
  end_date: timestamp("end_date", { mode: "string" }).notNull(),
});

export const SlugBaseTable = pgTable("slug_table", {
  slug_base: text("slug_base").primaryKey(),
  latest_number: smallint().default(0).notNull(),
});

export type InsertTournament = typeof TournamentTable.$inferInsert;
export type SelectTournament = typeof TournamentTable.$inferSelect;

export type InsertSlugBase = typeof SlugBaseTable.$inferInsert;
export type SelectSlugBase = typeof SlugBaseTable.$inferSelect;
