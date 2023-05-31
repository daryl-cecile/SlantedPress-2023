import styles from "./styles.module.scss";

type TagsProps = {
    values: Array<string> | null
}

export default function Tags(props:TagsProps){
    if (!props.values) return null;
    return (
        <div className={styles.tags}>
            {props.values.map(t => {
                return <a className={styles.tagItem} href={'/tags/' + t}>{t}</a>
            })}
        </div>
    )
}