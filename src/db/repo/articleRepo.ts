import { eq, or } from "drizzle-orm";
import db from "../client";
import { Article, articlesTable } from "../schema";


export namespace ArticleRepo {

    export async function getAll(limit:number=50):Promise<Array<Article>> {
        const maxLimit = Math.min(limit, 499);
        return db.select().from(articlesTable).limit(maxLimit);
    }

    export async function getBySlug(slug:string):Promise<Article|null> {
        if (!slug) return null;
        const results = await db.select().from(articlesTable).where(eq(articlesTable.slug, slug));
        if (results.length === 0) return null;
        return results.at(0) ?? null;
    }

    export async function getByUserId(userId: string, limit:number=50) {
        if (!userId) return [];
        const maxLimit = Math.min(limit, 499);
        const results = await db.select().from(articlesTable).where(
            or(
                eq(articlesTable.authorId, userId),
                eq(articlesTable.editorId, userId)
            )
        ).limit(maxLimit);

        return results.filter((entry, index) => results.findIndex(e => e.id === entry.id) === index);
    }
    
}