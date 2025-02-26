import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import BoardContainer from "@/component/_common/board/_board-container";
import HydrateDecryptedAnswerProvider from "@/component/_common/hydrate-decrypted-answer-provider";
import InitializeGameSettingProvider from "@/component/_common/initialize-game-setting-provider";
import VirtualKeyboardContainer from "@/component/_common/virtual-keyboard/_virtual-keyboard-container";
import ResultDialogContainer from "@/component/result-dialog/_result-dialog-container";
import { Container } from "@/component/ui/container";

export const runtime = "edge";

const getDecryptedAnswer = async (
  cipherText: string
): Promise<string | null> => {
  try {
    const headersList = await headers();
    const host = headersList.get("host"); // 현재 요청된 도메인 (예: example.com)
    const protocol = headersList.get("x-forwarded-proto") || "http"; // Cloudflare/Vercel은 'https'
    const serverUrl = `${protocol}://${host}`;
    const res = await fetch(`${serverUrl}/api/answer/decrypt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cipherText }),
      cache: "no-store", // 최신 데이터 유지
    });

    if (!res.ok) {
      throw new Error("Failed to decrypt answer");
    }

    const { data } = (await res.json()) as {
      data: { decryptedAnswer: string };
    };
    return data.decryptedAnswer; // 복호화된 답변 반환
  } catch (error) {
    console.error("Error fetching decrypted answer:", error);
    return null;
  }
};
interface PageProps {
  params: Promise<{
    answer: string;
  }>;
}

const AnswerPage = async ({ params }: PageProps) => {
  const { answer } = await params;
  const decryptedAnswer = await getDecryptedAnswer(answer);

  if (!decryptedAnswer) {
    redirect("/");
  }

  return (
    <Container className="gap-y-16 p-2 container-center">
      <HydrateDecryptedAnswerProvider
        decryptedAnswer={decryptedAnswer}
        encryptedAnswer={answer}>
        <InitializeGameSettingProvider encryptedAnswer={answer}>
          <BoardContainer />
          <VirtualKeyboardContainer />
          <Suspense>
            <ResultDialogContainer />
          </Suspense>
        </InitializeGameSettingProvider>
      </HydrateDecryptedAnswerProvider>
    </Container>
  );
};

export default AnswerPage;
