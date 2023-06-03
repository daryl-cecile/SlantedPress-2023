import { CommentsRepo } from "@/db/repo/comments";
import styles from "./styles.module.scss";
import CommentEntry from "./commentEntry";
import { clerkClient } from "@clerk/nextjs";
import { Comment } from "@/db/schema";
import { getFullName } from "@/helpers/user";

type CommentStreamProps = {
    topicReference: string
}

export default async function CommentStream(props:CommentStreamProps){
    const comments = await CommentsRepo.getByArticleId(props.topicReference);

    if (comments.length === 0) return <></>

    const users = await clerkClient.users.getUserList({
        externalId: comments.map(c => c.userId.toUpperCase())
    });

    const topLevelComments = comments.filter(c => c.parentId === null);

    function generateCommentProps(comment:Comment): null | Parameters<typeof CommentEntry>[0] {
        const user = users.find(u => u.externalId === comment.userId.toUpperCase());

        if (!user) return null;
        if (!comment.ts) return null;

        const nestedResponses = comments.filter(c => c.parentId === comment.id).flatMap(c => {
            const res = generateCommentProps(c);
            if (res) return [res];
            return []
        });

        return {
            user: {
                username: user.username!,
                id: user.id,
                fullName: getFullName(user)!,
                imageUrl: user ? `/assets/dp/${user.id}` : "https://assets.slantedpress.com/dp/x"
            },
            content: comment.content!,
            id: comment.id,
            datePublished: comment.ts,
            responses: nestedResponses.length > 0 ? nestedResponses : undefined
        }
    }

    return (
        <div className={styles.stream}>

            {topLevelComments.map(comment => {
                const commentProps = generateCommentProps(comment);

                console.log(comment, commentProps);
                if (!commentProps) return;

                return <CommentEntry {...commentProps} key={comment.id} />
            })}

        </div>
    )
}