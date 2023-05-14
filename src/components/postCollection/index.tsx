import ArticleCard from "../articleCard";
import styles from "./styles.module.scss";

type PostCollectionProps = {
  items: Array<SimpleArticle>;
  spotlight?: boolean;
};

export default function PostCollection(props: PostCollectionProps) {
  return (
    <div className={styles.collection}>
      {props.items.map((item, index) => {
        return <ArticleCard key={item.id} article={item} />;
      })}
    </div>
  );
}
