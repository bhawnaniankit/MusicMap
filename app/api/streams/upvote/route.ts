import { authOptions } from "@/app/lib/auth-option";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const upVoteSchema = z.object({
  streamId: z.string()
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 403
    })
  }

  const user = session.user;
  try {
    const data = upVoteSchema.parse(await req.json());

    await prisma.upvote.create({
      data: {
        userId: user.id,
        streamId: data.streamId
      }
    })
    return NextResponse.json({
      message: "Done!",
    });
  }
  catch {
    return NextResponse.json({
      message: "Error while upvoting"
    }, {
      status: 403
    })
  }
}
