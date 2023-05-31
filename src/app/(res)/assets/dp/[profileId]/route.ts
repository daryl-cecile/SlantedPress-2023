import { clerkClient } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

type RequestInfo = {
    params: {
        profileId: string
    }
}

export async function GET(req:NextRequest, {params}:RequestInfo){

    const user = await clerkClient.users.getUser(params.profileId);

    if (!user) return notFound();

    // TODO check in bucket whether another image exists

    const userPrimaryEmail = user.emailAddresses.find(ea => ea.id === user.primaryEmailAddressId)?.emailAddress;

    if (!userPrimaryEmail) return notFound();

    const md5 = createHash('md5').update(userPrimaryEmail).digest('hex');

    const fallback = encodeURIComponent(user.imageUrl);

    const source = `https://www.gravatar.com/avatar/${md5}?d=${fallback}`;

    return NextResponse.redirect(source);

}