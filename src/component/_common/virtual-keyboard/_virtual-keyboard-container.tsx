"use client";

import { memo } from "react";

import { Box } from "@/component/ui/box";
import { useVirtualKeyboardController } from "@/script/hook/use-virtual-keyboard-controller";

import VirtualKeyboard from "./virtual-keyboard";

const VirtualKeyboardContainer = () => {
  const { virtualKeyboard } = useVirtualKeyboardController();

  const MemoVirtualKeyboard = memo(VirtualKeyboard);

  return (
    <Box className="flex flex-col items-center justify-center gap-y-1.5 virtual-keyboard-container">
      {virtualKeyboard.map((keyboard, keyboardIndex) => {
        return (
          <MemoVirtualKeyboard
            key={keyboardIndex}
            keyboard={keyboard}
            keyboardIndex={keyboardIndex}
          />
        );
      })}
    </Box>
  );
};

export default VirtualKeyboardContainer;
