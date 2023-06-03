import Link from "next/link";
import styles from "./styles.module.scss";
import AccountMenu from "./account";
import { currentUser } from "@clerk/nextjs";

export default async function NavBar() {

    const user = await currentUser();

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
                    { user ? (
                        <AccountMenu userId={user.id} />
                    ) : (
                        <a href={"/sign-in"} className={styles.navAuthBtn}>Log In</a>
                    )}
                </li>
            </ul>
        </nav>
    )
}