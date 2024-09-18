import { authOptions } from "@/app/lib/auth-option";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createSpaceSchema = z.object({
  name: z.string().min(1, { message: "Enter a valid string" })
})

export async function POST(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  if (!session.user) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 403
    })
  }
  try {
    const data = createSpaceSchema.parse(body);
    const space = await prisma.space.create({
      data: {
        name: data.name,
        userId: session.user.id
      }
    })
    return NextResponse.json({
      id: space.id
    })
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Error while creating a space"
    }, {
      status: 411
    })
  }

}
