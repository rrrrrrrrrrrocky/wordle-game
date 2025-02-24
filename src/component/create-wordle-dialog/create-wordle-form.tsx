"use client";

import { FormEventHandler, forwardRef } from "react";

import { Box } from "@/component/ui/box";
import { Button } from "@/component/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/ui/dialog";
import { Input } from "@/component/ui/input";

interface Props {
  isPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const CreateWordleForm = forwardRef<HTMLInputElement, Props>(
  ({ onSubmit, isPending }, inputRef) => {
    return (
      <Box className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>워들 생성하기</DialogTitle>
          <DialogDescription>
            5글자의 영어 단어를 입력하면 새로운 게임이 시작됩니다! 🎉
          </DialogDescription>
        </DialogHeader>
        <Box
          className="flex items-center space-x-2"
          component="form"
          id="valid-word-form"
          onSubmit={onSubmit}>
          <Box className="grid flex-1 gap-2">
            <Input ref={inputRef} disabled={isPending} />
          </Box>
          <Button
            className="px-3"
            disabled={isPending}
            form="valid-word-form"
            type="submit">
            생성
          </Button>
        </Box>
      </Box>
    );
  }
);

export default CreateWordleForm;
