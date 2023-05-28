import { NextResponse } from 'next/server';
import { getAllArticles } from '@/helpers/articleFetcher';


export async function GET(){
   

    return NextResponse.json(
        await getAllArticles()
    )
}