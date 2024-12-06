import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const authUsers = pgTable("auth.users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const UserTable = pgTable("usernames", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id),
  username: text("username").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
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

export type InsertTournament = typeof TournamentTable.$inferInsert;
export type SelectTournament = typeof TournamentTable.$inferSelect;
