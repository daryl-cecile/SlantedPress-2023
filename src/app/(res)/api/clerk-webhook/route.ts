import { clerkUserAdded, clerkUserRemoved } from "@/actions/syncUsers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const content = await request.json();
    
    if (request.headers.get('X-CLERK-EXPECT-KEY') !== 'slantedpress-2023') return NextResponse.json({ status: 'bad-header' });

    if (content.object !== "event") return NextResponse.json({ status: 'skipped' });

    if (content.type === "user.created" && "data" in content && "id" in content.data) {
        await clerkUserAdded(content.data.id);
        return NextResponse.json({ status: 'ack' });
    }

    if (content.type === "user.deleted" && "data" in content && "id" in content.data && content.data.deleted) {
        await clerkUserRemoved(content.data.id);
        return NextResponse.json({ status: 'ack' });
    }

    return NextResponse.json({ status: 'ignored' });
}
