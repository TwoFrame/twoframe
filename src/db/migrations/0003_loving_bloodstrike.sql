CREATE TABLE IF NOT EXISTS "entrants" (
	"user_id" uuid NOT NULL,
	"event_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "slug_table" RENAME TO "slugs";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entrants" ADD CONSTRAINT "entrants_user_id_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entrants" ADD CONSTRAINT "entrants_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
