import format from "date-fns/format";
import { ReactNode } from "react";

type DateTimeProps = {
    value: Date | null,
    className?: string,
    fallback?: ReactNode
}

export default function DateTime(props:DateTimeProps){
    if (!props.value) return (props.fallback ?? null) as JSX.Element;
    return (
        <time dateTime={format(props.value, "yyyy-MM-dd")} className={props.className}>
            {format(props.value, "do MMMM yyyy")}
        </time>
    ) 
}