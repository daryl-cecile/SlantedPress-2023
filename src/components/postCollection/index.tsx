import { Article } from "@/db/schema";
import ArticleCard from "../articleCard";
import styles from "./styles.module.scss";

type PostCollectionProps = {
  items: Array<Article & {hint?: string}>;
  spotlight?: boolean;
};

export default function PostCollection(props: PostCollectionProps) {
  return (
    <div className={styles.collection} data-spotlight={props.spotlight}>
      {props.items.map((item) => {
        return <ArticleCard key={item.id} article={item} hint={item.hint ?? `${readingTime(item.content)}min read`} />;
      })}
    </div>
  );
}

function readingTime(text:string|null) {
  if (!text) return 0;
  const wpm = 265; // same as medium
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wpm);
  return minutes
}