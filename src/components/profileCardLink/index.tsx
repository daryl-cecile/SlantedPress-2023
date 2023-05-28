import db from "@/db/client"
import { usersTable } from "@/db/schema"
import { clerkClient } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { ReactNode } from "react"


type ProfileCardLinkProps = {
    profileId: string
}

export default async function ProfileCardLink(props:ProfileCardLinkProps){
    const dbUsers = await db.select().from(usersTable).where( eq(usersTable.id, props.profileId) );

    if (!dbUsers || dbUsers.length === 0) return <span>Non-{props.profileId}</span>

    const user = await clerkClient.users.getUser(dbUsers.at(0)!.clerkAccountId);

    if (!user) return <span>NotFound-{props.profileId}</span>

    const fullName = [user.firstName ?? '', user.lastName ?? ''].join(' ');

    return (
        <a className="text-purple-500" href={'/users/' + props.profileId}>{fullName || props.profileId}</a>
    )
}