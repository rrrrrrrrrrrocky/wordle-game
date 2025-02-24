"use client";

import { useCallback } from "react";

import { GameState } from "@/script/hook/store/use-game-store";

import { KEYBOARD } from "../constant/game";
import { useGameController } from "./use-game-controller";

interface UseVirtualKeyboardControllerReturn {
  virtualKeyboard: GameState["virtualKeyboard"];
  onClickVirtualKeyboard: (key: (typeof KEYBOARD)[number][number]) => void;
}

export const useVirtualKeyboardController =
  (): UseVirtualKeyboardControllerReturn => {
    const { onChangeLetter, virtualKeyboard, deleteLetter, onSubmitChallenge } =
      useGameController();

    const onClickVirtualKeyboard = useCallback<
      UseVirtualKeyboardControllerReturn["onClickVirtualKeyboard"]
    >(
      (key) => {
        if (key === "ENTER") {
          onSubmitChallenge();
        } else if (key === "BACKSPACE") {
          deleteLetter();
        } else {
          onChangeLetter(key);
        }
      },
      [onSubmitChallenge, deleteLetter, onChangeLetter]
    );

    return {
      virtualKeyboard,
      onClickVirtualKeyboard,
    };
  };
