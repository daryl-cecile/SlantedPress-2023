"use client";

import styles from "./styles.module.scss";
import intlFormatDistance from "date-fns/intlFormatDistance"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faReply } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import Link from "next/link";

type CommentEntryProps = {
    user: {
        fullName: string,
        imageUrl?: string,
        id: string,
        username?: string
    },
    datePublished: Date,
    content: string,
    id: string,
    responses?: Array<CommentEntryProps>
}

export default function CommentEntry(props:CommentEntryProps) {
    
    return (
        <div className={styles.entry}>
            <div className={styles.content}>
                <div className={styles.head}>
                    <img src={props.user.imageUrl ?? "https://assets.slantedpress.com/dp/x"} alt="" />
                    <p>
                        <Link href={`/users/${props.user.username}`}>{props.user.fullName}</Link>
                        <span>{intlFormatDistance(props.datePublished, Date.now())}</span>
                    </p>
                    <CommentMenu />
                </div>
                <div className={styles.body}>
                    <p>{props.content}</p>
                </div>
                <div className={styles.foot}>
                    <Button intent="secondary">
                        <FontAwesomeIcon icon={faReply} />
                        Reply
                    </Button>
                </div>
            </div>
            {props.responses ? (
                <>
                    {props.responses.map(r => {
                        return <CommentEntry {...r} key={r.id}/>  
                    })}
                </>
            ) : undefined}
        </div>
    )
}

function CommentMenu(){
    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Button><FontAwesomeIcon icon={faEllipsisVertical} /></Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item icon={<FontAwesomeIcon icon={faEllipsisVertical} />}>Settings</Menu.Item>
                <Menu.Item icon={<FontAwesomeIcon icon={faEllipsisVertical} />}>Messages</Menu.Item>
                <Menu.Item icon={<FontAwesomeIcon icon={faEllipsisVertical} />}>Gallery</Menu.Item>
                <Menu.Item
                    icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                    rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                >
                    Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<FontAwesomeIcon icon={faEllipsisVertical} />}>Transfer my data</Menu.Item>
                <Menu.Item color="red" icon={<FontAwesomeIcon icon={faEllipsisVertical} />}>Delete my account</Menu.Item>
            </Menu.Dropdown>
            </Menu>
    )
}