import { memo, useMemo } from "react";

import { Box } from "@/component/ui/box";
import { GameState } from "@/script/hook/store/use-game-store";
import { MatchType, VirtualKeyboardKey } from "@/script/type/game";
import { cn } from "@/script/util/ui-utils";

import KeyCodeButton from "./key-code-button";

interface Props {
  keyboard: GameState["virtualKeyboard"][number];
  keyboardIndex: number;
}

const VirtualKeyboard = ({ keyboard, keyboardIndex }: Props) => {
  const mergedKeyboard = useMemo(() => {
    const newKeyboard = keyboard.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    return Object.entries(newKeyboard) as Array<
      [VirtualKeyboardKey, MatchType]
    >;
  }, [keyboard]);

  const MemoKeyCodeButton = memo(KeyCodeButton);

  return (
    <Box
      className={cn(
        "grid flex-1 items-center justify-center gap-x-1.5 self-stretch",
        keyboardIndex === 0 && "virtual-keyboard-top",
        keyboardIndex === 1 && "virtual-keyboard-middle",
        keyboardIndex === 2 && "virtual-keyboard-bottom"
      )}>
      {mergedKeyboard.map(([keyCode, compareAnswer]) => {
        return (
          <MemoKeyCodeButton
            key={keyCode}
            compareAnswer={compareAnswer}
            keyCode={keyCode}
          />
        );
      })}
    </Box>
  );
};

export default VirtualKeyboard;
