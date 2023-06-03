import PageContent from "@/components/pageContent";
import PostCollection from "@/components/postCollection";
import Section from "@/components/section";
import { ArticleRepo } from "@/db/repo/articleRepo";
import { getFullName } from "@/helpers/user";
import { clerkClient } from "@clerk/nextjs";
import { notFound } from "next/navigation";

async function getArticles(userId:string) {
  const postCollection = await ArticleRepo.getByUserId(userId);

  return postCollection.map((post) => {
    return {
      ...post,
      heroImgSrc: `https://assets.slantedpress.com${post.heroImgSrc}`,
      postedTimestamp: post.postedTimestamp || new Date
    };
  });
}

export default async function UserPage({params}:DefaultProps) {
    const users = await clerkClient.users.getUserList({
        externalId: [ params.userId ]
    });

    if (users.length === 0) return notFound();

    const user = users.at(0)!;

    const articles = await getArticles(params.userId);

    console.log('got', articles.length, 'articles');
    
    articles.forEach(a => console.log(`-> `, a.slug, ' ==== ', a.id));

    return (
        <PageContent>
            <Section>
                <h1 className="text-4xl">{getFullName(user)}'s articles</h1>
                <br />
                <PostCollection 
                  items={articles.map(article => {
                    return {
                      ...article,
                      hint: article.authorId === params.userId ? 'Authored' : 'Edited'
                    }
                  })} 
                />
            </Section>
        </PageContent>
    );
}
