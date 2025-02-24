"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/component/ui/button";
import { useGetRandomWord } from "@/script/api/internal/internal-mutations";
import { useToast } from "@/script/hook/ui/use-toast";

const CreateRandomWordContainer = () => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { mutateAsync: getRandomWord, isPending } = useGetRandomWord();

  const onCreateRandomWord = async () => {
    try {
      const { data } = await getRandomWord();
      push(`/${data.encryptedAnswer}`);
    } catch (err) {
      console.error("failed create random word >>", err);
      toast({
        description: "단어 생성에 실패했습니다.. 😢\n다시시도해주세요.",
      });
    }
  };
  return (
    <Button disabled={isPending} onClick={onCreateRandomWord}>
      랜덤 단어로 게임하기
    </Button>
  );
};

export default CreateRandomWordContainer;
