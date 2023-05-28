import { Article } from "@/helpers/articleFetcher";
import ArticleCard from "../articleCard";
import styles from "./styles.module.scss";

type PostCollectionProps = {
  items: Array<Article>;
  spotlight?: boolean;
};

export default function PostCollection(props: PostCollectionProps) {
  return (
    <div className={styles.collection} data-spotlight={props.spotlight}>
      {props.items.map((item) => {
        return <ArticleCard key={item.id} article={item} />;
      })}
    </div>
  );
}
