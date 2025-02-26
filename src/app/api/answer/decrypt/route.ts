import { NextRequest, NextResponse } from "next/server";

import { WORD_LENGTH } from "@/script/constant/game";
import { InternalDto } from "@/script/dto/internal-dto/internal-dto";
import { decryptWord } from "@/script/util/common-util";

export const runtime = "edge";

export async function POST(
  req: NextRequest
): Promise<
  NextResponse<
    InternalDto.Response._PostDecryptAnswer | InternalDto.Response._Error
  >
> {
  const SECRET_KEY = process.env.CRYPTO_SECRET_KEY;
  const body: InternalDto.Request._PostDecryptAnswer = await req.json();

  if (!body.cipherText) {
    return NextResponse.json(
      { error: "복호화할 답변이 없습니다." },
      { status: 400 }
    );
  }

  const decryptedAnswer = decryptWord(body.cipherText, SECRET_KEY);

  if (decryptedAnswer.length !== WORD_LENGTH) {
    return NextResponse.json(
      { error: "복호화 된 답변의 길이가 맞지 않습니다." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "Success decrypt answer",
    data: {
      decryptedAnswer,
    },
  });
}
