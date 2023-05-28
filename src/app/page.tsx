import PageContent from "@/components/pageContent";
import PostCollection from "@/components/postCollection";
import Section from "@/components/section";
import { getAllArticles } from "@/helpers/articleFetcher";

async function getData() {
  const postCollection = await getAllArticles();

  return postCollection.map((post, index: number) => {
    return {
      ...post,
      heroImgSrc: `https://assets.slantedpress.com${post.heroImgSrc}`,
      timestamp: Date.now(),
      postedTimestamp: post.postedTimestamp || Date.now()
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
