import { storage } from "@/helpers/storage";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

type RouteInfo = {
    params: {
        resourcePath: Array<string>
    }
}

export const runtime = 'nodejs';

export async function GET(request: Request, {params}:RouteInfo){

    const path = params.resourcePath?.join('/');

    console.log(`Looking for ${path}`);

    if (!path || path === '/') return notFound();

    const obj = await storage.get(path);

    if (!obj?.Body) return notFound();

    if (!obj.ContentType) console.warn(`No Content-Type found for ${path}`);

    return new NextResponse(obj.Body?.transformToWebStream(), {
        headers: new Headers({
            "Content-Type": obj.ContentType ?? "application/octet-stream"
        })
    });
}