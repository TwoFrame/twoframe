CREATE TABLE IF NOT EXISTS "profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(16) NOT NULL,
	"tag" varchar(6) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tournaments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"title" varchar(48) NOT NULL,
	"description" varchar(500),
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"registration_deadline" timestamp NOT NULL,
	"slug" text NOT NULL,
	"public" boolean DEFAULT false,
	CONSTRAINT "tournaments_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_owner_id_profiles_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
