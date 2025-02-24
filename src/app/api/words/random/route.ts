import { NextRequest, NextResponse } from "next/server";

import {
  dictionaryApiInstance,
  randomWordApiInstance,
} from "@/script/config/axios-config";
import { DictionaryDto } from "@/script/dto/dictionary-dto/dictionary-dto";
import { InternalDto } from "@/script/dto/internal-dto/internal-dto";
import { RandomWordDto } from "@/script/dto/random-word-dto/random-word-dto";
import { encryptWord } from "@/script/util/common-util";
export async function GET(
  req: NextRequest
): Promise<
  NextResponse<
    InternalDto.Response._GetRandomWords | InternalDto.Response._Error
  >
> {
  try {
    const SECRET_KEY = process.env.CRYPTO_SECRET_KEY;

    if (!SECRET_KEY) {
      return NextResponse.json(
        { error: "서버 오류: 암호화 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const { searchParams } = req.nextUrl;
    const number = searchParams.get("number");
    const length = searchParams.get("length");

    if (!number || !length) {
      return NextResponse.json(
        { error: "Query string 'number'와 'length'가 필요합니다." },
        { status: 400 }
      );
    }

    let randomWord = "";
    try {
      const { data: getRandomWords } =
        await randomWordApiInstance.get<RandomWordDto.Response._GetRandomWords>(
          "/word",
          {
            params: {
              number,
              length,
            },
          }
        );

      randomWord = getRandomWords?.[0] || "";
      if (!randomWord) {
        return NextResponse.json(
          { error: "랜덤 단어를 가져오지 못했습니다." },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error fetching random word:", error);
      return NextResponse.json(
        { error: "랜덤 단어 API 호출에 실패했습니다." },
        { status: 500 }
      );
    }

    try {
      await dictionaryApiInstance.get<DictionaryDto.Response._GetWordCheck>(
        `/v2/entries/en/${randomWord}`
      );
    } catch (error) {
      console.error("Error verifying word in dictionary API:", error);
      return NextResponse.json(
        { error: "사전 API에서 단어 검증에 실패했습니다." },
        { status: 500 }
      );
    }

    let encryptedAnswer = "";
    try {
      encryptedAnswer = encryptWord(randomWord, SECRET_KEY);
    } catch (error) {
      console.error("Error encrypting word:", error);
      return NextResponse.json(
        { error: "단어 암호화에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Success create word",
      data: {
        encryptedAnswer,
      },
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      { error: "서버 내부 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
