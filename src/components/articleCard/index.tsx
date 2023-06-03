import Link from "next/link";
import styles from "./styles.module.scss";
import format from "date-fns/format";
import { Article } from "@/db/schema";

type ArticleCardProps = {
  article: Article;
  hint: string
};

export default function ArticleCard(props: ArticleCardProps) {
  const { article } = props;

  return (
    <div className={styles.article}>
      <img src={article.heroImgSrc} alt={""} loading={"lazy"} />
      <span className={styles.duration}>{props.hint}</span>
      <Link className={styles.info} href={`/articles/${article.slug}`}>
        <h3 className={styles.title}>{article.title}</h3>
        <span className={styles.publishDate}>
          {!!article.postedTimestamp && format(article.postedTimestamp, "MMMM do, yyyy") }
          </span>
      </Link>
    </div>
  );
}
