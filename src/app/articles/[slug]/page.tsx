import PageContent from "@/components/pageContent";
import Section from "@/components/section";
import db from "@/db/client";
import { articlesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { clsx } from 'clsx';

import { Roboto } from 'next/font/google';
import ProfileCardLink from "@/components/profileCardLink";

const roboto = Roboto({ subsets: ['latin'], weight: "900" });

export default async function ArticlePage({params}:DefaultProps){
    const result = await db.select().from(articlesTable).where( eq(articlesTable.slug, params.slug) );

    if (result.length === 0) return notFound();

    const article = result.at(0)!;

    return (
        <PageContent>
            <Section>
                <article>
                    <div>
                        <h1 className={clsx(roboto.className, 'text-[2.5rem] text-black')}>{article.title}</h1>
                        <br />
                        {/* @ts-expect-error Server-Component */}
                        <h4>Written by <ProfileCardLink profileId={article.authorId}/></h4>
                    </div>
                </article>
            </Section>
        </PageContent>
    )
}