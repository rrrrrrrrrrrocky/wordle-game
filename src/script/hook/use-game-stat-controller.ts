"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { getGameDuration } from "../util/service-utils";
import {
  GameStatStoreState,
  useGameStatPersistStore,
} from "./store/use-game-stat-persist-store";
import { initializeGameBoard, useGameStore } from "./store/use-game-store";

export const useGameStatController = () => {
  const { replace } = useRouter();
  const {
    activeGameSessions,
    setActiveGameSessions,
    setGameStat,
    setGameHistories,
    gameHistories,
    gameStat,
  } = useGameStatPersistStore(useShallow((state) => state));
  const { setChallengeCount, setGameBoard, encryptedAnswer } = useGameStore(
    useShallow((state) => state)
  );

  const findGameSession = useCallback(() => {
    return activeGameSessions.find(
      (session) => session.challengeId === encryptedAnswer
    );
  }, [activeGameSessions, encryptedAnswer]);

  const findIndexGameSession = useCallback(() => {
    return activeGameSessions.findIndex(
      (session) => session.challengeId === encryptedAnswer
    );
  }, [activeGameSessions, encryptedAnswer]);

  const findIndexGameHistory = useCallback(() => {
    return gameHistories.findIndex(
      (session) => session.challengeId === encryptedAnswer
    );
  }, [gameHistories, encryptedAnswer]);

  const findGameHistory = useCallback(() => {
    return gameHistories.find(
      (session) => session.challengeId === encryptedAnswer
    );
  }, [gameHistories, encryptedAnswer]);

  const initializeGame = useCallback(
    (encryptedAnswer: string) => {
      const searchParams = new URLSearchParams();

      const result = searchParams.get("result");
      if (result === "true") {
        replace("/");
        return;
      }
      const existGameSession = findGameSession();

      if (existGameSession) {
        setGameBoard(existGameSession.gameBoard);
        setChallengeCount(existGameSession.challengeCount);
      } else {
        setActiveGameSessions((prev) => [
          ...prev,
          {
            challengeId: encryptedAnswer,
            challengeCount: 0,
            gameBoard: initializeGameBoard(),
            startTimestamp: dayjs().valueOf(),
          },
        ]);
      }
    },
    [
      findGameSession,
      replace,
      setActiveGameSessions,
      setChallengeCount,
      setGameBoard,
    ]
  );

  const updateGameSession = (
    updateSessionData: Omit<
      GameStatStoreState["activeGameSessions"][number],
      "startTimestamp"
    >
  ) => {
    const existGameSessionIndex = findIndexGameSession();
    if (existGameSessionIndex > -1) {
      setActiveGameSessions((prev) => {
        const newSession = prev.map((session, index) => {
          if (index === existGameSessionIndex) {
            return {
              ...session,
              gameBoard: updateSessionData.gameBoard,
              challengeCount: updateSessionData.challengeCount,
              challengeId: updateSessionData.challengeId,
            };
          } else {
            return session;
          }
        });
        return newSession;
      });
    } else {
      setActiveGameSessions((prev) => [
        ...prev,
        {
          gameBoard: updateSessionData.gameBoard,
          challengeCount: updateSessionData.challengeCount,
          challengeId: updateSessionData.challengeId,
          startTimestamp: dayjs().valueOf(),
        },
      ]);
    }
  };

  const deleteGameSession = useCallback(() => {
    const existGameSessionIndex = findIndexGameSession();
    if (existGameSessionIndex > -1) {
      setActiveGameSessions((prev) => {
        const newGameSessions = [...prev];
        newGameSessions.splice(existGameSessionIndex, 1);
        return newGameSessions;
      });
    }
  }, [findIndexGameSession, setActiveGameSessions]);

  const addGameHistory = useCallback(
    (
      updateHistoryData: Omit<
        GameStatStoreState["gameHistories"][number],
        "playTime"
      >
    ) => {
      const existGameSession = findGameSession();
      const existGameHistoryIndex = findIndexGameHistory();
      if (existGameHistoryIndex > -1) {
        setGameHistories((prev) => {
          const newHistories = prev.map((history, index) => {
            if (index === existGameHistoryIndex) {
              return {
                ...updateHistoryData,
                playTime: getGameDuration({
                  startTime:
                    existGameSession?.startTimestamp || dayjs().valueOf(),
                  endTime: dayjs().valueOf(),
                }),
              };
            } else {
              return history;
            }
          });
          return newHistories;
        });
      } else {
        setGameHistories((prev) => [
          ...prev,
          {
            ...updateHistoryData,
            playTime: getGameDuration({
              startTime: existGameSession?.startTimestamp || dayjs().valueOf(),
              endTime: dayjs().valueOf(),
            }),
          },
        ]);
      }
    },
    [findGameSession, findIndexGameHistory, setGameHistories]
  );

  const updateGameStat = useCallback(
    ({ isWin, challengeCount }: { isWin: boolean; challengeCount: number }) => {
      const guesses = (challengeCount + 1).toString() as Exclude<
        keyof GameStatStoreState["gameStat"]["guesses"],
        "fail"
      >;
      setGameStat((prev) => ({
        totalGames: prev.totalGames + 1,
        wins: isWin ? prev.wins + 1 : prev.wins,
        losses: isWin ? prev.losses : prev.losses + 1,
        guesses: isWin
          ? {
              ...prev.guesses,
              [guesses]: prev.guesses[guesses] + 1,
            }
          : {
              ...prev.guesses,
              fail: prev.guesses.fail + 1,
            },
      }));
    },
    [setGameStat]
  );

  return {
    initializeGame,
    updateGameSession,
    deleteGameSession,
    addGameHistory,
    updateGameStat,
    findGameHistory,

    activeGameSessions,
    gameHistories,
    gameStat,
  };
};
