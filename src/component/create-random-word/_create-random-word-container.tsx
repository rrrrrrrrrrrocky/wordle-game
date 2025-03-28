"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/component/ui/button";
import { useGetRandomWord } from "@/script/api/internal/internal-mutations";
import { useToast } from "@/script/hook/ui/use-toast";
import { useGameController } from "@/script/hook/use-game-controller";

const CreateRandomWordContainer = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { mutateAsync: getRandomWord, isPending } = useGetRandomWord();
  const { resetAllState } = useGameController();

  const onCreateRandomWord = async () => {
    try {
      const { data } = await getRandomWord();
      resetAllState();
      push(`/${data.encryptedAnswer}`);
    } catch (err) {
      console.error("failed create random word >>", err);
      toast({
        description: "단어 생성에 실패했습니다.. 😢\n다시시도해주세요.",
      });
    }
  };
  return (
    <Button
      data-gtm-id="create-random-word:create-random-word"
      disabled={isPending}
      onClick={onCreateRandomWord}>
      랜덤 단어로 게임하기
    </Button>
  );
};

export default CreateRandomWordContainer;
