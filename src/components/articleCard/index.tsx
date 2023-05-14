import Link from "next/link";
import styles from "./styles.module.scss";

type ArticleCardProps = {
  article: SimpleArticle;
};

export default function ArticleCard(props: ArticleCardProps) {
  const { article } = props;

  return (
    <div className={styles.article}>
      <img src={article.imgSrc} alt={""} loading={"lazy"} />
      <span className={styles.duration}>2min read</span>
      <Link className={styles.info} href={`/posts/${article.slug}`}>
        <h3 className={styles.title}>{article.title}</h3>
        <span className={styles.publishDate}>{article.timestamp}</span>
      </Link>
    </div>
  );
}
