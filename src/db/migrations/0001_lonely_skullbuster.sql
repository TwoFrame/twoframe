CREATE TABLE IF NOT EXISTS "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tournament_id" uuid NOT NULL,
	"title" varchar(48)
);
--> statement-breakpoint
ALTER TABLE "tournaments" ALTER COLUMN "title" SET DATA TYPE varchar(48);--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "id";
ALTER TABLE "profiles" ADD PRIMARY KEY ("user_id");--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "username" SET DATA TYPE varchar(16);--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "description" varchar(500);--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "registration_deadline" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "public" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_tournament_id_tournaments_id_fk" FOREIGN KEY ("tournament_id") REFERENCES "public"."tournaments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_owner_id_profiles_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
