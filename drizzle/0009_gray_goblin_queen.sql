CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"authorId" uuid NOT NULL,
	"articleId" uuid NOT NULL,
	"postedTimestamp" timestamp with time zone,
	"parentId" uuid,
	"content" text
);
