ALTER TABLE "events" ALTER COLUMN "title" SET DATA TYPE varchar(40);--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "game" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "serialized_bracket" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "finished" SET NOT NULL;