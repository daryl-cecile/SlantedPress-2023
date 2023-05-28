import parse from "date-fns/parse"

export async function getArticle(slug:string) {
    return fetch(`https://api.slantedpress.com/raw/content/json/${slug}`)
        .then(res => res.json());
}

export async function getUsers(){
    return fetch(`https://api.slantedpress.com/api-transfer/users`)
        .then(res => res.json());
}

export type OldApiArticle = {
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

export type Article = {
    id: string,
    slug: string,
    title: string,
    authorId: string,
    snippet?: string,
    editorId?: string,
    postedTimestamp: number,
    heroImgSrc: string,
    isApproved: boolean,
    approverId?: string,

    content: string,
    category: number,
    tags: Array<string>,
    isPublished: boolean,
    isChoice: boolean,
    isInked: boolean,
    isUnderfeed: boolean,
    isDraft: boolean,
    isSponsored: boolean,
    version: number,
    jsonArticle?: any
}

export async function getAllArticles() {
    const users:Array<any> = await getUsers();
    const results = await fetch(`https://api.slantedpress.com/api-transfer/all`).then(res => res.json());

    const getUserIdByUsername = (username:string) => {
        return users.find(u => {
            if (username.startsWith('@') && u.username.toLowerCase() == username.substring(1).toLowerCase()) return true;
            if (u.username.toLowerCase() == username.toLowerCase()) return true;
            if ( (u.first_name + ' ' + u.last_name).toLowerCase() === username.toLowerCase() ) return true;
        })?.id;
    }

    return results.map((legacyEntry:OldApiArticle) => {
        const article:Article = {
            id: String(legacyEntry.id || legacyEntry.post_id),
            authorId: legacyEntry.author && (getUserIdByUsername(legacyEntry.author) ?? 'IDK-' + legacyEntry.author),
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
            postedTimestamp: parse(legacyEntry.date_posted, "ddMMMyyyy-kkmm", Date.now()).getTime(),
            slug: legacyEntry.slug,
            tags: legacyEntry.tags.split(',').map(t => t.trim()),
            title: legacyEntry.title,
            version: legacyEntry.e_version,
            approverId: legacyEntry.approved_by && (getUserIdByUsername(legacyEntry.approved_by) ?? 'IDK-' + legacyEntry.approved_by),
            editorId: legacyEntry.editor && (getUserIdByUsername(legacyEntry.editor) ??  'IDK-' + legacyEntry.editor),
            jsonArticle: legacyEntry.json_article,
            snippet: legacyEntry.snippet
        }

        return article;
    }) as Array<Article>;

}