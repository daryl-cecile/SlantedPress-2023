"use server";

import { clerkClient } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { createHash } from "crypto";
import extractColors from "extract-colors";

export async function getProfileColor(profileId:string){

    const user = await clerkClient.users.getUser(profileId);

    if (!user){
        console.log('No user found', profileId);
        return notFound();
    }

    // TODO check in bucket whether another image exists

    const userPrimaryEmail = user.emailAddresses.find(ea => ea.id === user.primaryEmailAddressId)?.emailAddress;

    if (!userPrimaryEmail) {
        console.log('No email found');
        return notFound();
    }

    const md5 = createHash('md5').update(userPrimaryEmail).digest('hex');

    const fallback = encodeURIComponent(user.imageUrl);

    const source = `https://www.gravatar.com/avatar/${md5}?d=${fallback}`;

    const colors = await extractColors(source);

    return colors.at(0);
}