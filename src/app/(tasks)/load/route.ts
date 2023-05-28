import { NextResponse } from 'next/server';
import { getAllArticles } from '@/helpers/articleFetcher';
import db from '@/db/client';
import { articlesTable } from '@/db/schema';
import { syncUsersFromClerk } from '@/actions/syncUsers';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

export async function GET(){

    await syncUsersFromClerk();

    return NextResponse.json({stat:'ok'})

    // const errors = [];
    // const added = [];
   
    // const articles = await getAllArticles();

    // for (const article of articles) {
    //     // try {
    //         // await db.transaction(async (tx) => {
    //             if ( !validateUUID(article.id) ) article.id = uuidv4();

    //             article.authorId = article.authorId?.toLowerCase();
    //             article.editorId = article.editorId?.toLowerCase() ?? null;
    //             article.approverId = article.approverId?.toLowerCase() ?? null;

    //             if ( !validateUUID(article.authorId) ) console.log('authorId is not valid', article.authorId)
    //             if ( article.editorId && !validateUUID(article.editorId) ) console.log('editorId is not valid', article.editorId)
    //             if ( article.approverId && !validateUUID(article.approverId) ) console.log('approverId is not valid', article.approverId)

    //             article.tags = article.tags?.filter(Boolean) ?? null;

    //             const resp = await db.insert(articlesTable).values(article).returning();
    //             added.push(resp);
    //     //     });
            
    //     // }
    //     // catch (e: any) {
    //     //     errors.push({
    //     //         e: String(e),
    //     //         message: e?.message,
    //     //         article
    //     //     })
    //     // }
    // }

    // return NextResponse.json({
    //     errors,
    //     added
    // })
}