import { NextRequest, NextResponse } from "next/server";

import { WORD_LENGTH } from "@/script/constant/game";
import { InternalDto } from "@/script/dto/internal-dto/internal-dto";
import { encryptWord } from "@/script/util/common-util";

export async function POST(
  req: NextRequest
): Promise<
  NextResponse<
    InternalDto.Response._PostEncryptAnswer | InternalDto.Response._Error
  >
> {
  const SECRET_KEY = process.env.CRYPTO_SECRET_KEY;
  const body = await req.json();

  if (!body.originalAnswer || body.originalAnswer.length < WORD_LENGTH) {
    return NextResponse.json(
      { error: "originalAnswer를 확인하세요." },
      { status: 400 }
    );
  }

  const encryptedAnswer = encryptWord(body.originalAnswer, SECRET_KEY);

  return NextResponse.json({
    message: "Success encrypt answer",
    data: {
      encryptedAnswer,
    },
  });
}
