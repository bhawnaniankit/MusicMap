import { authOptions } from "@/app/lib/auth-option";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const createStreamScheam = z.object({
  spaceId: z.string(),
  url: z.string()
})

const YT_REGEX = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session.user) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 403
    })
  }
  try {
    const data = createStreamScheam.parse(await req.json());
    const isYt = data.url.match(YT_REGEX);
    if (!isYt) {
      return NextResponse.json({
        message: "Wrong URL format"
      }, {
        status: 411
      })
    }

    const extractedId = data.url.split("?v=")[1];
    const youtubeData = await youtubesearchapi.GetVideoDetails(extractedId)
    console.log(youtubeData)

    await prisma.stream.create({
      data: {
        userId: session.user.id,
        spaceId: data.spaceId,
        url: data.url,
        extractedId,
        type: "Youtube"
      }
    })

    return NextResponse.json({
      message: "Stream Added"
    })

  }
  catch (e) {
    return NextResponse.json({
      message: "Error while adding the stream"
    }, {
      status: 411
    })
  }
}


export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const spaceId = req.nextUrl.searchParams.get("spaceId");

  console.log(session)
  if (!session?.user) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 403
    })
  }

  const user = session.user;
  console.log(user)

  if (!spaceId) {
    return NextResponse.json({
      message: "Error"
    }, {
      status: 411
    })
  }

  return NextResponse.json({ message: "Done" })

}
