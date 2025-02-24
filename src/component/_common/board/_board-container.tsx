"use client";

import { memo } from "react";

import { Box } from "@/component/ui/box";
import { useGameController } from "@/script/hook/use-game-controller";
import { useKeyDownListener } from "@/script/hook/use-keydown-listener";

import Board from "./board";

const BoardContainer = () => {
  const { gameBoard } = useGameController();

  useKeyDownListener();

  const MemoBoard = memo(Board);

  return (
    <Box className="grid w-full max-w-80 grid-rows-6 gap-1.5">
      {gameBoard.map((challenge, challengeIndex) => {
        return (
          <MemoBoard
            key={challengeIndex}
            challenge={challenge}
            challengeIndex={Number(challengeIndex)}
          />
        );
      })}
    </Box>
  );
};

export default BoardContainer;
