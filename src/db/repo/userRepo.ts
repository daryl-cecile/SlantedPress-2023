import { eq } from "drizzle-orm";
import db from "../client";
import { User, usersTable } from "../schema";


export namespace UserRepo {

    export async function getAll(limit:number=50):Promise<Array<User>> {
        const maxLimit = Math.min(limit, 499);
        return db.select().from(usersTable).limit(maxLimit);
    }

    export async function getById(id:string):Promise<User|null> {
        if (!id) return null;
        const results = await db.select().from(usersTable).where(eq(usersTable.id, id));
        if (results.length === 0) return null;
        return results.at(0) ?? null;
    }

    
}