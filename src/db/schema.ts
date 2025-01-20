import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  smallint,
  pgSchema,
  unique,
} from "drizzle-orm/pg-core";
import { GAMES } from "@/app/_lib/schemas";

const authSchema = pgSchema("auth");

const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const profiles = pgTable(
  "profiles",
  {
    user_id: uuid("user_id")
      .primaryKey()
      .references(() => users.id)
      .notNull(),
    username: varchar("username", { length: 16 }).notNull(),
    tag: varchar("tag", { length: 6 }).notNull(),
  },
  (t) => [unique("unique_tag").on(t.username, t.tag)],
);

export const tournaments = pgTable("tournaments", {
  id: uuid("id").defaultRandom().primaryKey(),
  owner_id: uuid("owner_id")
    .references(() => profiles.user_id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  title: varchar("title", { length: 48 }).notNull(),
  description: varchar("description", { length: 500 }),
  start_date: timestamp("start_date", { mode: "string" }).notNull(),
  end_date: timestamp("end_date", { mode: "string" }).notNull(),
  registration_deadline: timestamp("registration_deadline", {
    mode: "string",
  }).notNull(),
  slug: text("slug").unique().notNull(),
  public: boolean("public").default(false),
});

export const gameEnum = pgEnum("game", GAMES);

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  tournament_id: uuid("tournament_id")
    .references(() => tournaments.id)
    .notNull(),
  //this stuff is what users fill in on the event creation form
  title: varchar("title", { length: 32 }).notNull(),
  game: gameEnum().notNull(),
  entrant_limit: smallint("entrant_limit").notNull(),
  start_date: timestamp("start_date", { mode: "string" }).notNull(),
  rules: varchar("rules", { length: 2000 }).default("").notNull(),
  //this stuff gets made after creation
  created_at: timestamp("created_at", {mode:"string"}).defaultNow().notNull(),
  attendees: smallint("attendees").default(0).notNull(),
  slug: text("slug").notNull(),
  serialized_bracket: text("serialized_bracket").default("").notNull(),
  completed: boolean("finished").default(false).notNull(),
});

export const entrants = pgTable("entrants", {
  user_id: uuid("user_id")
    .references(() => profiles.user_id)
    .notNull(),
  event_id: uuid("event_id")
    .references(() => events.id)
    .notNull(),
});

export const slugs = pgTable("slugs", {
  slug_base: text("slug_base").primaryKey(),
  latest_number: smallint().default(0).notNull(),
});

export type InsertProfile = typeof profiles.$inferInsert;
export type InsertEntrant = typeof entrants.$inferInsert;

export type InsertTournament = typeof tournaments.$inferInsert;
export type SelectTournament = typeof tournaments.$inferSelect;

export type InsertSlugBase = typeof slugs.$inferInsert;
export type SelectSlugBase = typeof slugs.$inferSelect;

export type InsertEvent = typeof events.$inferInsert;
