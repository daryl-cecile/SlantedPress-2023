"use client";

import clsx from "clsx";
import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";
type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    intent?: "primary" | "secondary"
}

export default function Button(props:ButtonProps) {
    const {className, intent, ...otherProps} = props;

    return (
        <button 
            {...otherProps} 
            className={
                clsx(
                    styles.defaultButton,
                    {
                        [styles.primaryButton]: intent === "primary",
                        [styles.secondaryButton]: intent === "secondary"
                    }, 
                    className
                )
        } 
        />
    )
}