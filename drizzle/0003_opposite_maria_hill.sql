ALTER TABLE "users" ADD COLUMN "clerkAccountId" text NOT NULL;
ALTER TABLE "users" DROP COLUMN IF EXISTS "strategy";