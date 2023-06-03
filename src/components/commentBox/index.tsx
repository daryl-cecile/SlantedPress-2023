"use client";

import { useUser, SignInButton } from '@clerk/nextjs';
import styles from "./styles.module.scss";
import { useState } from 'react';
import Button from '../button';

type CommentBoxProps = {
    topic: "article" | "discussions",
    topicReference: string
}

export default function CommentBox(props:CommentBoxProps){
    const [content, setContent] = useState('');
    const {user, isLoaded, isSignedIn} = useUser();

    return (
        <div className={styles.commentBox}>
            <img src={user ? `/assets/dp/${user.id}` : "https://assets.slantedpress.com/dp/x"} alt={''} />
            <div className={styles.content}>
                <textarea
                    aria-label='Add a comment'
                    placeholder='Add a comment'
                    name="comment" 
                    rows={3}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    maxLength={240}
                ></textarea>
                <div className={styles.belt}>
                    <span>{240 - content.length} remaining</span>
                    <Button intent="primary">Comment</Button>
                </div>
            </div>
        </div>
    )
}