import { boolean, integer, jsonb, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { InferModel } from 'drizzle-orm';

export const usersTable = pgTable('users', {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkAccountId: text('clerkAccountId').notNull()
});

export type User = InferModel<typeof usersTable>; // return type when queried
export type NewUser = InferModel<typeof usersTable, 'insert'>; // insert type
 
export const articlesTable = pgTable('articles', {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  authorId: uuid("authorId").notNull().references(() => usersTable.id),
  snippet: text("snippet"),
  editorId: uuid("editorId").references(() => usersTable.id),
  postedTimestamp: integer("postedTimestamp"),
  heroImgSrc: text('heroImageSrc').notNull(),
  isApproved: boolean('isApproved').default(false),
  approverId: uuid('approverId').references(() => usersTable.id),

  content: text('content'),
  category: integer('category'),
  tags: text('tags').array(),
  isPublished: boolean('isPublished').default(false),
  isChoice: boolean('isChoice').default(false),
  isInked: boolean('isInked').default(false),
  isUnderfeed: boolean('isUnderfeed').default(false),
  isDraft: boolean('isDraft').default(true),
  isSponsored: boolean('isSponsored').default(false),
  version: integer('version').default(4),
  jsonArticle: jsonb('v3_jsonArticle')
});
   
export type Article = InferModel<typeof articlesTable>; // return type when queried
export type NewArticle = InferModel<typeof articlesTable, 'insert'>; // insert type