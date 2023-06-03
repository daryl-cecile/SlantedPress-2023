import { User } from "@clerk/nextjs/dist/types/server/clerkClient";

export function getFullName(user:User) {
    if (!user) return null;
    
    const names = [];

    if (user.firstName) names.push(user.firstName);
    if (user.lastName) names.push(user.lastName);

    if (names.length === 0) names.push(user.username);

    return names.join(' ');
    
}