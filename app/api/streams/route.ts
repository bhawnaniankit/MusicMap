import { authOptions } from "@/app/lib/auth-option";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createStreamScheam = z.object({
  spaceId: z.string(),
  url: z.string()
})

const YT_REGX = new RegExp("");

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
