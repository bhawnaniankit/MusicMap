import { NextRequest } from "next/server";
import { z } from "zod";

const upVoteSchema = z.object({
  streamId: z.string()
})

export async function POST(req: NextRequest) {
  try {

  }
}
