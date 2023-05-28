ALTER TABLE "articles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();