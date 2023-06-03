import db from "@/db/client"
import { usersTable } from "@/db/schema"
import { clerkClient } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { ProfileCard } from "../profileCard"
import styles from "./styles.module.scss";
import { UserRepo } from "@/db/repo/userRepo"

type ProfileCardLinkProps = {
    profileId: string
}

export default async function ProfileCardLink(props:ProfileCardLinkProps){
    const dbUser = await UserRepo.getById(props.profileId);

    if (!dbUser) return <span>Non-{props.profileId}</span>

    const user = await clerkClient.users.getUser(dbUser.clerkAccountId);

    if (!user) return <span>NotFound-{props.profileId}</span>

    const fullName = [user.firstName ?? '', user.lastName ?? ''].join(' ');
    const emailAddress = user.emailAddresses.find(ea => ea.id === user.primaryEmailAddressId)?.emailAddress;

    return (
        <div className={styles.linkContainer}>
            <a className={styles.link} href={'/users/' + props.profileId}>{fullName || props.profileId}</a>
            <ProfileCard
                className={styles.linkCard}
                articleCount={12} 
                fullName={fullName || props.profileId} 
                kudosCount={44} 
                memberSince={new Date(user.createdAt)} 
                profileImageSrc={`/assets/dp/${user.id}`}
                emailAddress={user.publicMetadata.isEmailPublic == true ? emailAddress : undefined}
                profileId={props.profileId}
            />
        </div>
    )
}