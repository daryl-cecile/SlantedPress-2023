"use server";

import { clerkClient } from "@clerk/nextjs";
import parse from "date-fns/parse"
import { Article, articlesTable } from "@/db/schema";
import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import db from "../client";

type OldApiArticle = {
    title: string,
	slug: string,
    id?: string, // post-id,
    post_id: number,
    author: string, //username
    snippet?: string,
    editor?: string, //username
    date_posted: string, //DDMMMYYYY-HHMM
    read_count: string,
    likes: number,
    hero: string,
    approved: number,
    approved_by?: string, //username,
    content: string,
    category: number,
    tags: string,
    is_published: number,
    is_choice: number,
    is_inked: number,
    is_underfeed: number,
    is_draft: number,
    is_sponsored: number,
    e_version: number,
    json_article?: any
} 

async function getAllArticles() {
    const users = await clerkClient.users.getUserList({ limit: 499 });
    const results = await fetch(`https://api.slantedpress.com/api-transfer/all`).then(res => res.json());

    const getUserIdByUsername = (handle?:string) => {
        const username = handle?.replaceAll('.', '_');
        if (!username) return null;
        handle = username.toLowerCase();
        const usr = users.find(u => {
            if (!u.username) return false;
            if (username.startsWith('@') && u.username.toLowerCase() == username.substring(1)) return true;
            if (u.username.toLowerCase() == username.toLowerCase()) return true;
            if ( (u.firstName + ' ' + u.lastName).toLowerCase() === handle) return true;
        });

        return usr?.externalId ?? null;
    }

    return results.map((legacyEntry:OldApiArticle) => {
        
        if (!legacyEntry.date_posted.includes('-')) legacyEntry.date_posted += `-0700`;
        if (legacyEntry.date_posted.endsWith('-0000')) legacyEntry.date_posted = legacyEntry.date_posted.replace('-0000', '-0700');

        const timestamp = parse(legacyEntry.date_posted, legacyEntry.date_posted?.includes('-') ?  "ddMMMyyyy-HHmm" : "ddMMyyyy", Date.now());

        if (!timestamp || String(timestamp).includes('Invalid Date')) console.log(`Timestamp failed for ${legacyEntry.date_posted}`);

        const article:Article = {
            id: uuidv4(),
            legacyId: legacyEntry.post_id,
            authorId: getUserIdByUsername(legacyEntry.author)!,
            category: legacyEntry.category,
            content: legacyEntry.content,
            heroImgSrc: legacyEntry.hero,
            isApproved: legacyEntry.approved === 1,
            isChoice: legacyEntry.is_choice === 1,
            isDraft: legacyEntry.is_draft === 1,
            isInked: legacyEntry.is_inked === 1,
            isPublished: legacyEntry.is_published === 1,
            isSponsored: legacyEntry.is_sponsored === 1,
            isUnderfeed: legacyEntry.is_underfeed === 1,
            postedTimestamp: timestamp,
            slug: legacyEntry.slug,
            tags: legacyEntry.tags.split(',').map(t => t.trim()),
            title: legacyEntry.title,
            version: legacyEntry.e_version,
            approverId: getUserIdByUsername(legacyEntry.approved_by),
            editorId: getUserIdByUsername(legacyEntry.editor),
            jsonArticle: legacyEntry.json_article ? JSON.parse(legacyEntry.json_article) : null,
            snippet: legacyEntry.snippet ?? null
        }

        return article;
    }) as Array<Article>;

}

export async function migrateArticles(){
    const errors = [];
    const added:Array<Article> = [];
   
    const articles = await getAllArticles();

    for (const article of articles) {
        try {
            await db.transaction(async (tx) => {

                article.authorId = article.authorId?.toLowerCase();
                article.editorId = article.editorId?.toLowerCase() ?? null;
                article.approverId = article.approverId?.toLowerCase() ?? null;

                if ( !validateUUID(article.authorId) ) console.log('authorId is not valid', article.authorId)
                if ( article.editorId && !validateUUID(article.editorId) ) console.log('editorId is not valid', article.editorId)
                if ( article.approverId && !validateUUID(article.approverId) ) console.log('approverId is not valid', article.approverId)

                article.tags = article.tags?.filter(Boolean) ?? null;

                const resp = await tx.insert(articlesTable).values(article).returning();
                added.push(...resp);
            });
            
        }
        catch (e: any) {
            errors.push({
                e: String(e),
                message: e?.message,
                article
            })
        }
    }

    return {errors, added};
}