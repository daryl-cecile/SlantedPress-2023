import PageContent from "@/components/pageContent";
import PostCollection from "@/components/postCollection";
import Section from "@/components/section";
import { ArticleRepo } from "@/db/repo/articleRepo";

async function getData() {
  const postCollection = await ArticleRepo.getAll(12);

  return postCollection.map((post) => {
    return {
      ...post,
      heroImgSrc: `https://assets.slantedpress.com${post.heroImgSrc}`,
      postedTimestamp: post.postedTimestamp || new Date
    };
  });
}

export default async function Home() {
  const articles = await getData();

  return (
    <PageContent>
      <Section>
        <PostCollection items={articles} spotlight={true} />
      </Section>
    </PageContent>
  );
}
