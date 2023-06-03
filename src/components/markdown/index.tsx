import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'

import styles from "./styles.module.scss";
import clsx from 'clsx';
import Rating from '../rating';
import { ReactNode } from 'react';
import { MDImage } from './mdComponents';

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
                    return <MDImage src={src} alt={alt} {...props} />
                },
                p: ({node, children, ...props}) => {
                    if (children?.length === 1 && children.at(0)!.toString().startsWith('Rating: ')) {
                        let [value, max] = children.at(0)!.toString().split(": ")[1].split("/").map(Number);
                        return <Rating max={max} value={value}/>
                    }
                    const elements = [];
                    const currentElementChildren:Array<any> = [];

                    children?.forEach((c:any) => {
                        if (typeof c !== "string" && "type" in c && c.type.name === "img") {
                            if (currentElementChildren.length > 0) elements.push([...currentElementChildren]);
                            currentElementChildren.length = 0;
                        }
                        currentElementChildren.push(c);
                    });
                    
                    if (currentElementChildren.length > 0) elements.push([...currentElementChildren]);

                    return (
                        <>
                            {elements.map((element, idx) => {
                                if (element.length === 0) return null;
                                if (element.length === 1 && element[0]?.type?.name === "img"){
                                    return <MDImage key={idx} {...element[0].props} />
                                }
                                return <p key={idx} {...props}>{element}</p>
                            })}
                        </>
                    );
                }
            }}
        />
    )
}
