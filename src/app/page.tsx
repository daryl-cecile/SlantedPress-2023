import PageContent from "@/components/pageContent";
import PostCollection from "@/components/postCollection";
import Section from "@/components/section";

async function getData(): Promise<Array<SimpleArticle>> {
  const postCollection: Array<any> = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());
  const imageCollection: Array<any> = await fetch(
    "https://jsonplaceholder.typicode.com/photos"
  ).then((res) => res.json());

  return postCollection.map((post: any, index: number) => {
    return {
      ...post,
      imgSrc: imageCollection.at(index).url,
      timestamp: Date.now(),
    };
  });
}

export default async function Home() {
  const articles = await getData();

  return (
    <PageContent>
      <Section>
        <h1>Hello world</h1>
        <PostCollection items={articles} spotlight={true} />
      </Section>
    </PageContent>
  );
}
