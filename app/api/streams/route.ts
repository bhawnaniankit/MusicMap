import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createStreamScheam = z.object({
  userId: z.string(),
  spaceId: z.string(),
  url: z.string()
})

const YT_REGX = new RegExp("");

export async function POST(req: NextRequest) {
  try {
    const data = createStreamScheam.parse(await req.json());
    const isYt = YT_REGX.test(data.url);
    if (!isYt) {
      return NextResponse.json({
        message: "Wrong URL format"
      }, {
        status: 411
      })
    }

    const extractedId = data.url.split("?v=")[1];

    await prisma.stream.create({
      data: {
        userId: data.userId,
        spaceId: data.spaceId,
        url: data.url,
        extractedId,
        type: "Youtube"
      }
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
