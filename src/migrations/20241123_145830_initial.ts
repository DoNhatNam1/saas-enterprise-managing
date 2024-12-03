import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "books" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"book_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "books_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "books_id" integer;
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
  
  CREATE INDEX IF NOT EXISTS "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "books_updated_at_idx" ON "books" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "books_created_at_idx" ON "books" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "books_rels_order_idx" ON "books_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "books_rels_parent_idx" ON "books_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "books_rels_path_idx" ON "books_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "books_rels_authors_id_idx" ON "books_rels" USING btree ("authors_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_books_fk" FOREIGN KEY ("books_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_books_id_idx" ON "payload_locked_documents_rels" USING btree ("books_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "books_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "books" CASCADE;
  DROP TABLE "books_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_authors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_books_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_authors_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_books_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "authors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "books_id";`)
}
