"use server";

import db from "@/db/client";
import { usersTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { eq } from "drizzle-orm";
import {nanoid} from "nanoid";

function pause(seconds:number) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

export async function syncUsersFromClerk(){

    
    let clerkUsers:Array<User> = [];
    clerkUsers = await clerkClient.users.getUserList({ limit: 499 });

    let clerkApiHitCount = 0;

    for (let clerkUser of clerkUsers) {
        
        const dbUsers = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.clerkAccountId, clerkUser.id));

        if ( dbUsers.length > 0 ) continue;

        const result = await db.insert(usersTable).values({
            clerkAccountId: clerkUser.id,
            id: clerkUser.externalId ?? undefined
        }).returning();

        if (!clerkUser.externalId && result.length > 0) {
            await clerkClient.users.updateUser(clerkUser.id, { externalId: result.at(0)?.id });
            clerkApiHitCount ++;

            if (clerkApiHitCount > 15) {
                clerkApiHitCount = 0;
                await pause(10);
            }
        }
    
    }

    // get it again
    clerkUsers = await clerkClient.users.getUserList({ limit: 499 });

    const dbUsers = await db.select().from(usersTable);

    if (clerkUsers.length === dbUsers.length) return;

    for (let dbUser of dbUsers) {

        if ( !!clerkUsers.find(u => u.externalId === dbUser.id) ) continue;

        await db.delete(usersTable).where( eq(usersTable.id, dbUser.id) );

    }


}

export async function clerkUserRemoved(clerkUserId: string) {
    await db.delete(usersTable).where( eq(usersTable.clerkAccountId, clerkUserId) );
}

export async function clerkUserAdded(clerkAccountId: string){
    const entry = await db.insert(usersTable).values({
        clerkAccountId: clerkAccountId
    }).returning();

    if (!entry || entry.length === 0) return;

    await clerkClient.users.updateUser(clerkAccountId, { externalId: entry.at(0)?.id });
    
}

export async function migrateUsers(){
    const oldCollection = await fetch("https://api.slantedpress.com/api-transfer/comments").then(res => res.json());

    let count = 0;

    for (let oldUser of oldCollection) {

        oldUser.username = oldUser.username.replaceAll(".", "_");
        oldUser.id = oldUser.id.toLowerCase();

        if (oldUser.username === "selinenatour") oldUser.email = oldUser.email.replace('@', '+slantedExtra@');

        const newUser:InitUserAccount = {
            id: undefined as any,
            username: oldUser.username,
            firstName: oldUser.first_name,
            lastName: oldUser.last_name,
            emailAddress: [ oldUser.email ],
            externalId: oldUser.id,
            password: nanoid(18),
            unsafeMetadata: {
                notifyOnFlagged: true,
                notifyOnPosts: oldUser.notify_post === 1,
                notifyOnReview: true
            },
            privateMetadata: {
                legacyPermissions: oldUser.permissions
            },
            publicMetadata: {
                bio: oldUser.bio,
                dateJoined: new Date(oldUser.date_created),
                displayPictureSrc: oldUser.pic,
                isBlocked: oldUser.blocked === 1,
                isEmailPublic: oldUser.email_public === 1,
                isSuperUser: oldUser.plus === 1,
                isSuspended: oldUser.suspended === 1,
                isVerified: oldUser.confirmed === 1,
                kudos: oldUser.kudos
            }
        }

        const added = await clerkClient.users.createUser(newUser);

        await db.insert(usersTable).values({
            clerkAccountId: added.id,
            id: added.externalId!
        });

        if (count >= 15){
            console.log('Waiting 10s to avoid rate limit');
            await pause(10);
            count = 0;
        }
        count ++;

    }
}

export async function resyncUserIds(){
    const allUsers = await clerkClient.users.getUserList({ limit: 499 });

    let count = 0;

    for (let u of allUsers) {

        await clerkClient.users.updateUser(u.id, {
            externalId: u.externalId?.toLowerCase()
        });

        if (count >= 15){
            count = 0;
            console.log('Waiting 10s to avoid rate limit')
            await pause(10);
        }

        console.log('Updated', u.username);

        count ++;

    }

    console.log('Done');
}