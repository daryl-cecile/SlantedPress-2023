import styles from "./styles.module.scss";

export default function PageContent({children}:DefaultProps) {
    return (
        <main className={styles.content}>
            {children}
        </main>
    )
}