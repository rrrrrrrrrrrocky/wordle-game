"use client";

import { Delete } from "lucide-react";

import { useVirtualKeyboardController } from "@/script/hook/use-virtual-keyboard-controller";
import { MatchType, VirtualKeyboardKey } from "@/script/type/game";
import { cn } from "@/script/util/ui-utils";

interface Props {
  keyCode: VirtualKeyboardKey;
  compareAnswer: MatchType;
}

const KeyCodeButton = ({ keyCode, compareAnswer }: Props) => {
  const { onClickVirtualKeyboard } = useVirtualKeyboardController();

  return (
    <button
      className={cn(
        "flex size-full items-center justify-center rounded-sm bg-light-gray text-2xl font-bold uppercase text-gray dark:bg-gray dark:text-white",
        keyCode === "ENTER" && "text-xs",
        compareAnswer === "MATCHED" &&
          "border-none bg-green-700 text-white dark:bg-green-700",
        compareAnswer === "PARTIAL_MATCHED" &&
          "border-none bg-yellow-500 text-white dark:bg-yellow-500",
        compareAnswer === "NOT_MATCHED" &&
          "border-none bg-gray text-white dark:bg-light-gray"
      )}
      onClick={() => onClickVirtualKeyboard(keyCode)}>
      {keyCode === "BACKSPACE" ? <Delete size={20} /> : keyCode}
    </button>
  );
};

export default KeyCodeButton;
