import { eq } from "drizzle-orm";
import db from "../client";
import { Comment, articlesTable, commentsTable } from "../schema";


type OldComment = {
    user_id: string,
    content: string,
    post_slug: string,
    ts: string,
    responds_to:number,
    id: string
}

const ignoreSlugs = [
    "updates-introducing-unsplash-images"
]

export async function migrateComments() {
    const legacyItems:Array<OldComment> = await fetch("https://api.slantedpress.com/api-transfer/comments").then(res => res.json());
    const results:Array<Comment> = [];

    await db.transaction(async tx => {

        for (const oldCommentEntry of legacyItems) {
            const dbArticles = await tx.select().from(articlesTable).where(eq(articlesTable.slug, oldCommentEntry.post_slug));

            if (!dbArticles || dbArticles.length < 1) {
                if (ignoreSlugs.includes(oldCommentEntry.post_slug)) continue;
                throw Error('Could not find article with slug ' + oldCommentEntry.post_slug);
            }

            const entry = await tx.insert(commentsTable).values({
                articleId: dbArticles.at(0)!.id,
                content: oldCommentEntry.content,
                userId: oldCommentEntry.user_id,
                ts: new Date(oldCommentEntry.ts),
                id: oldCommentEntry.id
            }).returning();

            results.concat(...entry);
        }

    });

    return results;
}
