import Link from "next/link";
import styles from "./styles.module.scss";

export default function NavBar() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href={"/"}>
                        <img src="/brand/logo_full.svg" alt="" className={styles.navLogo} />
                    </Link>
                </li>

                <li className={styles.navSeparator}/>

                <li><Link href={"/explore"}>Explore</Link></li>
                <li><Link href={"/listen"}>Listen</Link></li>
                <li><Link href={"/about"}>About</Link></li>

                <li>
                    <button className={styles.navAuthBtn}>Log In</button>
                </li>
            </ul>
        </nav>
    )
}