ALTER TABLE "events" ADD COLUMN "serialized_bracket" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "finished" boolean DEFAULT false;