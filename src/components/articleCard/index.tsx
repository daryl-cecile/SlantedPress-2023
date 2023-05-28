import Link from "next/link";
import styles from "./styles.module.scss";
import format from "date-fns/format";
import { Article } from "@/helpers/articleFetcher";

type ArticleCardProps = {
  article: Article;
};

export default function ArticleCard(props: ArticleCardProps) {
  const { article } = props;

  return (
    <div className={styles.article}>
      <img src={article.heroImgSrc} alt={""} loading={"lazy"} />
      <span className={styles.duration}>2min read</span>
      <Link className={styles.info} href={`/posts/${article.slug}`}>
        <h3 className={styles.title}>{article.title}</h3>
        <span className={styles.publishDate}>
          {format(article.postedTimestamp, "MMMM do, yyyy") }
          </span>
      </Link>
    </div>
  );
}
