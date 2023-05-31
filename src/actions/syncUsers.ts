"use server";

import db from "@/db/client";
import { usersTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";
import { eq } from "drizzle-orm";

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
