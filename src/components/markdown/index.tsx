import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'

import styles from "./styles.module.scss";
import clsx from 'clsx';
import Rating from '../rating';
import { ReactNode } from 'react';

type MarkdownProps = {
    content?: string | null,
    justifyText?: boolean,
    fallback?: ReactNode
}

export default function Markdown(props:MarkdownProps){
    if (!props.content) return (props.fallback ?? null) as JSX.Element;
    return (
        <ReactMarkdown 
            className={clsx(styles.mdContainer, props.justifyText ? 'text-justify' : undefined)}
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            children={props.content}
            skipHtml={false}
            components={{
                img: ({node, className, src, alt, ...props})=>{
                    return (
                        <figure>
                            <img src={src} alt="" className={clsx(className, 'mt-8')} {...props} />
                            <figcaption>{alt}</figcaption>
                        </figure>
                    )
                },
                p: ({node, children, ...props}) => {
                    if (children?.length === 1 && children.at(0)!.toString().startsWith('Rating: ')) {
                        let [value, max] = children.at(0)!.toString().split(": ")[1].split("/").map(Number);
                        return <Rating max={max} value={value}/>
                    }
                    return <p {...props}>{children}</p>
                }
            }}
        />
    )
}
