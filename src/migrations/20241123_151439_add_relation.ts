import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "books_rels" RENAME TO "authors_rels";
  ALTER TABLE "authors_rels" RENAME COLUMN "authors_id" TO "books_id";
  ALTER TABLE "authors_rels" DROP CONSTRAINT "books_rels_parent_fk";
  
  ALTER TABLE "authors_rels" DROP CONSTRAINT "books_rels_authors_fk";
  
  DROP INDEX IF EXISTS "books_rels_order_idx";
  DROP INDEX IF EXISTS "books_rels_parent_idx";
  DROP INDEX IF EXISTS "books_rels_path_idx";
  DROP INDEX IF EXISTS "books_rels_authors_id_idx";
  DO $$ BEGIN
   ALTER TABLE "authors_rels" ADD CONSTRAINT "authors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "authors_rels" ADD CONSTRAINT "authors_rels_books_fk" FOREIGN KEY ("books_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "authors_rels_order_idx" ON "authors_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "authors_rels_parent_idx" ON "authors_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "authors_rels_path_idx" ON "authors_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "authors_rels_books_id_idx" ON "authors_rels" USING btree ("books_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "authors_rels" RENAME TO "books_rels";
  ALTER TABLE "books_rels" RENAME COLUMN "books_id" TO "authors_id";
  ALTER TABLE "books_rels" DROP CONSTRAINT "authors_rels_parent_fk";
  
  ALTER TABLE "books_rels" DROP CONSTRAINT "authors_rels_books_fk";
  
  DROP INDEX IF EXISTS "authors_rels_order_idx";
  DROP INDEX IF EXISTS "authors_rels_parent_idx";
  DROP INDEX IF EXISTS "authors_rels_path_idx";
  DROP INDEX IF EXISTS "authors_rels_books_id_idx";
  DO $$ BEGIN
   ALTER TABLE "books_rels" ADD CONSTRAINT "books_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "books_rels" ADD CONSTRAINT "books_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "books_rels_order_idx" ON "books_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "books_rels_parent_idx" ON "books_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "books_rels_path_idx" ON "books_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "books_rels_authors_id_idx" ON "books_rels" USING btree ("authors_id");`)
}
