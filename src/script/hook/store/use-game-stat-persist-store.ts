"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GameState } from "./use-game-store";

// 게임 저장소 인터페이스 (게임 진행 중 데이터를 저장)
interface ActiveGameSessions {
  challengeId: string; // AES 암호화된 단어 (정답)
  gameBoard: GameState["gameBoard"]; // 게임 보드 상태
  startTimestamp: number; // 게임 시작 타임스탬프
  challengeCount: GameState["challengeCount"];
}

// 게임 기록(히스토리) 관리 인터페이스
export interface GameHistory {
  challengeId: string; // AES 암호화된 단어 (정답)
  playTime: string; // 진행시간 (계산 후 노출시킬 문자열)
  attempts: number; // 몇 번째 시도에서 완료했는지
  isSuccess: boolean; // 성공 여부 (true = 성공, false = 실패)
}

// 게임 결과를 집계하는 인터페이스
interface GameStat {
  totalGames: number; // 총 진행 횟수
  wins: number; // 이긴 횟수
  losses: number; // 진 횟수
  guesses: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
    fail: number;
  };
}

export interface GameStatStoreState {
  gameStat: GameStat; // 전체 게임 통계
  activeGameSessions: Array<ActiveGameSessions>; // 여러개의 게임을 켜놓을 수 있음
  gameHistories: Array<GameHistory>; // 히스토리 배열
}

type SetState<T extends keyof GameStatStoreState> = (
  setState:
    | GameStatStoreState[T]
    | ((setState: GameStatStoreState[T]) => GameStatStoreState[T])
) => void;

interface GameStatStoreAction {
  setGameStat: SetState<"gameStat">;
  setActiveGameSessions: SetState<"activeGameSessions">;
  setGameHistories: SetState<"gameHistories">;
}

const initialState: GameStatStoreState = {
  activeGameSessions: [],
  gameStat: {
    wins: 0,
    totalGames: 0,
    losses: 0,
    guesses: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      fail: 0,
    },
  },
  gameHistories: [],
};

export const useGameStatPersistStore = create<
  GameStatStoreState & GameStatStoreAction
>()(
  persist(
    (set) => ({
      ...initialState,
      setGameStat: (setState) => {
        set((state) => ({
          gameStat:
            typeof setState === "function"
              ? setState(state.gameStat)
              : setState,
        }));
      },
      setActiveGameSessions: (setState) => {
        set((state) => ({
          activeGameSessions:
            typeof setState === "function"
              ? setState(state.activeGameSessions)
              : setState,
        }));
      },
      setGameHistories: (setState) => {
        set((state) => ({
          gameHistories:
            typeof setState === "function"
              ? setState(state.gameHistories)
              : setState,
        }));
      },
    }),
    {
      name: "game-stat-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
