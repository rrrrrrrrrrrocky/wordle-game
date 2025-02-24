"use client";

import { useCallback, useEffect } from "react";

import { useGameController } from "./use-game-controller";

export const useKeyDownListener = () => {
  const { onChangeLetter, deleteLetter, onSubmitChallenge } =
    useGameController();

  const handleKeyCode = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;

      if (key === "Enter") {
        onSubmitChallenge();
      } else if (key === "Backspace") {
        deleteLetter();
      } else {
        onChangeLetter(key);
      }
    },
    [onSubmitChallenge, deleteLetter, onChangeLetter]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyCode);

    return () => {
      window.removeEventListener("keydown", handleKeyCode);
    };
  }, [handleKeyCode]);
};
