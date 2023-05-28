ALTER TABLE "articles" DROP CONSTRAINT "articles_authorId_users_id_fk";

DO $$ BEGIN
 ALTER TABLE "articles" ADD CONSTRAINT "articles_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
