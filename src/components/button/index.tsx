"use client";

import clsx from "clsx";
import { ForwardedRef, HTMLAttributes, forwardRef } from "react";
import styles from "./styles.module.scss";
type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    intent?: "primary" | "secondary" | "profileImage"
}

export default forwardRef(function Button(props:ButtonProps, ref:ForwardedRef<HTMLButtonElement>) {
    const {className, intent, ...otherProps} = props;

    return (
        <button 
            ref={ref}
            {...otherProps} 
            className={
                clsx(
                    styles.defaultButton,
                    {
                        [styles.primaryButton]: intent === "primary",
                        [styles.secondaryButton]: intent === "secondary",
                        [styles.profileImage]: intent === "profileImage"
                    }, 
                    className
                )
        } 
        />
    )
})