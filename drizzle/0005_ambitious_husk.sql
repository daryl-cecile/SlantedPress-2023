ALTER TABLE "articles" DROP COLUMN IF EXISTS "postedTimestamp";
ALTER TABLE "articles" ADD COLUMN "postedTimestamp" timestamp with time zone;