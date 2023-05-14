import styles from "./styles.module.scss";

export default function Section({ children }: DefaultProps) {
  return <section className={styles.section}>{children}</section>;
}
