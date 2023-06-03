import { eq } from "drizzle-orm";
import db from "../client";
import { Comment, commentsTable } from "../schema";


export namespace CommentsRepo {

    export async function getAll(limit:number=50):Promise<Array<Comment>> {
        const maxLimit = Math.min(limit, 499);
        return db.select().from(commentsTable).limit(maxLimit);
    }

    export async function getById(id:string):Promise<Comment|null> {
        if (!id) return null;
        const results = await db.select().from(commentsTable).where(eq(commentsTable.id, id));
        if (results.length === 0) return null;
        return results.at(0) ?? null;
    }

    export async function getByArticleId(articleId:string):Promise<Array<Comment>> {
        if (!articleId) return [];
        return db.select().from(commentsTable).where(eq(commentsTable.articleId, articleId));
    }

    
}