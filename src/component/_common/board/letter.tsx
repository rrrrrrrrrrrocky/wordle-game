import { GameState } from "@/script/hook/store/use-game-store";
import { cn } from "@/script/util/ui-utils";

const Letter = ({
  gameData,
}: {
  gameData: GameState["gameBoard"][number][number];
}) => {
  const { compareAnswer, letter } = gameData;
  return (
    <button
      className={cn(
        "aspect-square cursor-default border-2 border-light-gray text-5xl font-bold uppercase",
        compareAnswer === "MATCHED" && "border-none bg-green-700 text-white",
        compareAnswer === "PARTIAL_MATCHED" &&
          "border-none bg-yellow-500 text-white",
        compareAnswer === "NOT_MATCHED" && "border-none bg-gray text-white"
      )}>
      {letter || ""}
    </button>
  );
};
export default Letter;
