import { migrateComments } from '@/db/migrationTasks/comments';
import { NextResponse } from 'next/server';

export async function GET(){

    const results = await migrateComments();

    return NextResponse.json(results)

}