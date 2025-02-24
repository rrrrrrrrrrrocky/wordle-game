"use client";

import { ReactNode, useEffect } from "react";

import { useGameStatController } from "@/script/hook/use-game-stat-controller";
import useMount from "@/script/hook/use-mount";

interface Props {
  children: ReactNode;
  encryptedAnswer: string;
}

const InitializeGameSettingProvider = ({
  children,
  encryptedAnswer,
}: Props) => {
  const { initializeGame } = useGameStatController();
  const { mounted } = useMount();

  useEffect(() => {
    if (mounted) initializeGame(encryptedAnswer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encryptedAnswer, mounted]);

  return children;
};

export default InitializeGameSettingProvider;
