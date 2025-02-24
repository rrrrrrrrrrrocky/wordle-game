import { memo } from "react";

import { Box } from "@/component/ui/box";
import { GameState } from "@/script/hook/store/use-game-store";

import Letter from "./letter";

const Board = ({
  challenge,
  challengeIndex,
}: {
  challenge: GameState["gameBoard"][number];
  challengeIndex: number;
}) => {
  const MemoLetter = memo(Letter);

  return (
    <Box
      key={challengeIndex}
      className="grid w-full grid-cols-5 gap-1.5"
      id={`challenge-${challengeIndex}`}>
      {challenge.map((gameData, letterIndex) => (
        <MemoLetter
          key={`${challengeIndex}-${letterIndex}`}
          gameData={gameData}
        />
      ))}
    </Box>
  );
};

export default Board;
