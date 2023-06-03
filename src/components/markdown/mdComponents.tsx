import clsx from "clsx"
import { HTMLAttributes } from "react"

type MDImageProps = {
    src?: string,
    alt?: string
} & HTMLAttributes<HTMLImageElement>

export function MDImage({src, alt, className, ...props}:MDImageProps) {
    if (!src) return null;

    return (
        <figure>
            <img src={src} alt="" className={clsx(className, 'mt-8')} {...props} />
            {!!alt && <figcaption>{alt}</figcaption>}
        </figure>
    )
}