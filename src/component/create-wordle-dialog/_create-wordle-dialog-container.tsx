"use client";

import Link from "next/link";
import { FormEventHandler, useRef } from "react";

import { Box } from "@/component/ui/box";
import { Button } from "@/component/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/component/ui/dialog";
import { WORD_LENGTH } from "@/script/constant/game";
import { ENGLISH_REGEX } from "@/script/constant/regex";
import { useToast } from "@/script/hook/ui/use-toast";
import { useGameController } from "@/script/hook/use-game-controller";
import { useNewWordleUrl } from "@/script/hook/use-new-wordle-url";
import { WordCheckResult } from "@/script/type/game";
import { cleanedText } from "@/script/util/regex-utils";
import { cn } from "@/script/util/ui-utils";

import CopyUrlSection from "./copy-url-section";
import CreateWordleForm from "./create-wordle-form";

const CreateWordleDialogContainer = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { handleNewWordleUrl, newWordleUrl } = useNewWordleUrl();
  const { validateWord, encryptAnswer, isPending, resetAllState } =
    useGameController();

  const showToastAndFocus = (message: string) => {
    toast({ description: message });
    inputRef.current?.focus();
  };

  const validateSubmitWord = (word: string) => {
    if (!word) return "값이 입력되지 않았습니다 😭";
    if (!ENGLISH_REGEX.test(word)) return "영문 입력만 가능합니다!";
    if (word.length !== WORD_LENGTH)
      return `${WORD_LENGTH}글자만 입력해주세요!`;
    return null;
  };

  const handleWordCheckResult = (result: WordCheckResult) => {
    if (result === "INVALID") return "단어를 찾을 수 없습니다 😢";
    if (result === "ERROR") return "단어 검증에 실패했습니다 😱";
    return null;
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const submitWord = cleanedText(inputRef.current?.value || "");

    // 1️⃣ 기본 유효성 검사
    const validationError = validateSubmitWord(submitWord);
    if (validationError) {
      showToastAndFocus(validationError);
      return;
    }

    // 2️⃣ 단어 유효성 검사 (API 요청)
    const wordCheckResult = await validateWord(submitWord);
    const wordError = handleWordCheckResult(wordCheckResult);
    if (wordError) {
      showToastAndFocus(wordError);
      return;
    }

    // 3️⃣ 단어 암호화 및 상태 업데이트
    const encryptedAnswer = await encryptAnswer(submitWord);
    resetAllState();
    handleNewWordleUrl(encryptedAnswer);
    toast({ description: "게임이 생성되었습니다! 👏" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">워들 생성하기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <Box className="flex flex-col gap-8">
          {newWordleUrl ? (
            <CopyUrlSection newWordleUrl={newWordleUrl} />
          ) : (
            <CreateWordleForm
              ref={inputRef}
              isPending={isPending}
              onSubmit={onSubmit}
            />
          )}
        </Box>
        <DialogFooter className="mt-4 flex flex-row-reverse gap-x-4">
          {newWordleUrl && (
            <Button asChild>
              <Link href={newWordleUrl}>이동하기</Link>
            </Button>
          )}
          <DialogClose asChild>
            <Button
              className={cn(!newWordleUrl && "w-full")}
              type="button"
              variant="secondary">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWordleDialogContainer;
