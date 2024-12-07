CREATE TABLE IF NOT EXISTS "slug_table" (
	"slug_base" text PRIMARY KEY NOT NULL,
	"latest_number" smallint DEFAULT 0 NOT NULL
);
