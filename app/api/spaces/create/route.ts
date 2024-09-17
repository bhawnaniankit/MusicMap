import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createSpaceSchema = z.object({
  name: z.string(),
  userId: z.string()
})

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  try {
    const data = createSpaceSchema.parse(body);
    await prisma.space.create({
      data: {
        name: data.name,
        userId: data.userId
      }
    })
  }
  catch (e) {
    return NextResponse.json({
      message: "Error while creating a space"
    }, {
      status: 411
    })
  }

}
