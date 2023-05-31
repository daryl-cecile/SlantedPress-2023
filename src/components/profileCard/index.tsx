"use client";
import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

type ProfileCardProps = {
    profileImageSrc: string,
    fullName: string,
    emailAddress?: string,
    memberSince: Date,
    articleCount: number,
    kudosCount: number,
    profileId: string,
    className?: string
}

export function ProfileCard(props:ProfileCardProps) {
    const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className={clsx(styles.card, props.className)}>
            <div className={styles.bgImage} style={{ backgroundImage: `url('${props.profileImageSrc}')` }} />
            <div className={styles.midRow}>
                <img 
                    src={props.profileImageSrc} 
                    alt="" 
                    className={styles.dp}
                />
            </div>
            <div className={styles.allElse}>
                <h2 className={styles.nameLine}>{props.fullName}</h2>
                <span className={styles.emailLine}>{props.emailAddress}</span>
                <span className={styles.sinceLine}>Member Since {months[props.memberSince.getMonth()]} {props.memberSince.getFullYear()}</span>
                <div className={styles.metricRow}>
                    <div>
                        <span>Articles</span>
                        <span>{props.articleCount}</span>
                    </div>
                    <div>
                        <span>Kudos</span>
                        <span>{props.kudosCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

