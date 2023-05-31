import PageContent from "@/components/pageContent";
import Section from "@/components/section";
import db from "@/db/client";
import { articlesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { clsx } from 'clsx';
import styles from "./styles.module.scss";

import { Roboto } from 'next/font/google';
import ProfileCardLink from "@/components/profileCardLink";
import Markdown from "@/components/markdown";
import DateTime from "@/components/datetime";
import Tags from "@/components/tags";
import CommentBox from "@/components/commentBox";

const roboto = Roboto({ subsets: ['latin'], weight: "900" });

export default async function ArticlePage({params}:DefaultProps){
    const result = await db.select().from(articlesTable).where( eq(articlesTable.slug, params.slug) );

    if (result.length === 0) return notFound();

    const article = result.at(0)!;

    return (
        <PageContent>
            <Section>
                <article>
                    <div className={styles.articlePage}>
                        <h1 className={clsx(roboto.className, 'text-[2.5rem] text-black')}>{article.title}</h1>
                        <br />
                        {/* @ts-expect-error Server-Component */}
                        <span className="block">Written by <ProfileCardLink profileId={article.authorId}/></span>
                        <DateTime 
                            value={article.postedTimestamp} 
                            className={"text-gray-500"}
                            fallback={<span className="text-red-500 font-bold underline">Not Published</span>} 
                        />
                        <div className={styles.articleBody}>
                            <Markdown 
                                content={article.content} 
                                fallback={<span className="text-gray-500">No content</span>}
                                justifyText 
                            />
                        </div>
                        {article.editorId && (
                            <>
                                {/* @ts-expect-error Server-Component */}
                                <span className="block">Edited by <ProfileCardLink profileId={article.editorId}/></span>
                            </>
                        )}
                        <Tags values={article.tags} />
                        <br />
                        <hr />
                        <br />
                        <h5 className="text-xl font-semibold">Comments</h5>
                        <CommentBox 
                            topic={"article"}
                            topicReference={article.id} 
                        />
                    </div>
                </article>
            </Section>
        </PageContent>
    )
}