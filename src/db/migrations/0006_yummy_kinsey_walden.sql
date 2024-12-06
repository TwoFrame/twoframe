ALTER TABLE "tournaments" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_slug_unique" UNIQUE("slug");