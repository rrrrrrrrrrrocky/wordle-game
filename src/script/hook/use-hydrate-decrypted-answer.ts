"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useGameStore } from "./store/use-game-store";

interface UseGameControllerParams {
  decryptedAnswer: string;
  encryptedAnswer?: string;
}

export const useHydrateDecryptedAnswer = ({
  decryptedAnswer,
  encryptedAnswer,
}: UseGameControllerParams) => {
  const { setDecryptedAnswer, setEncryptedAnswer } = useGameStore(
    useShallow((state) => state)
  );

  useEffect(() => {
    setDecryptedAnswer(decryptedAnswer?.toUpperCase());
    if (encryptedAnswer) {
      setEncryptedAnswer(encryptedAnswer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
