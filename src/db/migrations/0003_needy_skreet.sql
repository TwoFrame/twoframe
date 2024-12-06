ALTER TABLE "tournaments" DROP CONSTRAINT "tournaments_id_usernames_id_fk";
--> statement-breakpoint
ALTER TABLE "tournaments" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "tournaments" ADD COLUMN "owner_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_owner_id_usernames_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."usernames"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
