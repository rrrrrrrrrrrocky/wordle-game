"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { Box } from "@/component/ui/box";
import { Button } from "@/component/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/component/ui/dialog";
import { useGameController } from "@/script/hook/use-game-controller";
import { useGameStatController } from "@/script/hook/use-game-stat-controller";
import { formatWinRate } from "@/script/util/service-utils";

import { Typography } from "../ui/typography";

const ResultDialogContainer = () => {
  const searchParams = useSearchParams();
  const result = searchParams.get("result");
  const isFinish = result === "true";
  const { replace } = useRouter();
  const { resetAllState } = useGameController();
  const { findGameHistory, gameStat, deleteGameSession } =
    useGameStatController();

  const gameHistory = useMemo(() => {
    const gameHistoryData = findGameHistory();
    return gameHistoryData;
  }, [findGameHistory]);

  const onClose = useCallback(() => {
    resetAllState();
    deleteGameSession();
    replace("/");
  }, [deleteGameSession, replace, resetAllState]);

  return (
    isFinish && (
      <Dialog
        open={isFinish}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}>
        <DialogContent className="sm:max-w-md ">
          <Box className="flex flex-col gap-8">
            <Box className="flex flex-col gap-y-4">
              <DialogHeader>
                <DialogTitle>
                  {gameHistory?.isSuccess
                    ? "정답입니다! 🎉"
                    : "틀렸습니다.. 😭"}
                </DialogTitle>

                <DialogDescription>
                  지금까지의 게임 결과입니다.
                </DialogDescription>
              </DialogHeader>

              <Box className="mx-auto flex flex-col items-start gap-y-2">
                {gameStat.totalGames > 0 && (
                  <Typography className="text-muted-foreground" variant="p">
                    - 총 게임 횟수: {gameStat.totalGames}
                  </Typography>
                )}
                {gameStat.wins > 0 && (
                  <Typography className="text-muted-foreground" variant="p">
                    - 정답 횟수: {gameStat.wins}
                  </Typography>
                )}
                {gameStat.totalGames > 0 && gameStat.wins > 0 && (
                  <Typography className="text-muted-foreground" variant="p">
                    - 승률: {formatWinRate(gameStat.wins, gameStat.totalGames)}
                  </Typography>
                )}
                {gameHistory?.playTime && (
                  <Typography className="text-muted-foreground" variant="p">
                    - 게임 시간: {gameHistory?.playTime}
                  </Typography>
                )}
                <Box className="flex flex-col items-center gap-y-1">
                  <Typography className="text-muted-foreground" variant="p">
                    - 횟수 별 결과
                  </Typography>
                  <Box className="flex w-full flex-col items-start justify-start gap-y-1 px-2">
                    {Object.entries(gameStat.guesses).map(
                      ([attempts, count]) => {
                        return (
                          <Box key={attempts} className="flex">
                            <Typography
                              className="text-sm text-muted-foreground"
                              component="span">
                              - {attempts}: {count}회
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <DialogFooter className="mt-4 flex flex-row-reverse gap-x-4">
            <DialogClose asChild>
              <Button
                className="w-full"
                data-gtm-id="result-dialog:close"
                type="button"
                variant="secondary"
                onClick={onClose}>
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
};

export default ResultDialogContainer;
