"use client";

import { create } from "zustand";
import { combine } from "zustand/middleware";

import { KEYBOARD, MAX_ROW, WORD_LENGTH } from "@/script/constant/game";
import { MatchType, VirtualKeyboardKey } from "@/script/type/game";

interface GameBoardData {
  letter: string;
  /**
   * compareAnswer: "UNKNOWN" (default)
   */
  compareAnswer: MatchType;
}

type VirtualKeyboardKeyType = {
  [key in VirtualKeyboardKey]: MatchType;
};
type VirtualKeyboardType = Array<Array<VirtualKeyboardKeyType>>;

export type GameState = {
  gameBoard: Array<Array<GameBoardData>>;
  challengeCount: number;
  letterPosition: number;
  decryptedAnswer: string;
  virtualKeyboard: VirtualKeyboardType;
  encryptedAnswer: string;
};

export const initializeGameBoard = (): GameState["gameBoard"] => {
  return Array.from({ length: MAX_ROW }, () =>
    Array<GameState["gameBoard"][number][number]>(WORD_LENGTH).fill({
      letter: "",
      compareAnswer: "UNKNOWN",
    })
  );
};

const initializeVirtualKeyboard = (): VirtualKeyboardType => {
  const virtualKeyboard = KEYBOARD.map((line) =>
    line.map((key) => ({
      [key]: "UNKNOWN",
    }))
  ) as VirtualKeyboardType;
  return virtualKeyboard;
};

const initialState: GameState = {
  gameBoard: initializeGameBoard(),
  virtualKeyboard: initializeVirtualKeyboard(),
  challengeCount: 0,
  letterPosition: 0,
  decryptedAnswer: "",
  encryptedAnswer: "",
};

export const useGameStore = create(
  combine(initialState, (set) => {
    return {
      setGameBoard: (
        setState:
          | GameState["gameBoard"]
          | ((setState: GameState["gameBoard"]) => GameState["gameBoard"])
      ) => {
        set((state: GameState) => ({
          gameBoard:
            typeof setState === "function"
              ? setState(state.gameBoard)
              : setState,
        }));
      },
      setVirtualKeyboard: (
        setState:
          | GameState["virtualKeyboard"]
          | ((
              setState: GameState["virtualKeyboard"]
            ) => GameState["virtualKeyboard"])
      ) => {
        set((state: GameState) => ({
          virtualKeyboard:
            typeof setState === "function"
              ? setState(state.virtualKeyboard)
              : setState,
        }));
      },
      setChallengeCount: (
        setState:
          | GameState["challengeCount"]
          | ((
              setState: GameState["challengeCount"]
            ) => GameState["challengeCount"])
      ) => {
        set((state: GameState) => ({
          challengeCount:
            typeof setState === "function"
              ? setState(state.challengeCount)
              : setState,
        }));
      },
      setLetterPosition: (
        setState:
          | GameState["letterPosition"]
          | ((
              setState: GameState["letterPosition"]
            ) => GameState["letterPosition"])
      ) => {
        set((state: GameState) => ({
          letterPosition:
            typeof setState === "function"
              ? setState(state.letterPosition)
              : setState,
        }));
      },
      setDecryptedAnswer: (
        setState:
          | GameState["decryptedAnswer"]
          | ((
              setState: GameState["decryptedAnswer"]
            ) => GameState["decryptedAnswer"])
      ) => {
        set((state: GameState) => ({
          decryptedAnswer:
            typeof setState === "function"
              ? setState(state.decryptedAnswer)
              : setState,
        }));
      },
      setEncryptedAnswer: (
        setState:
          | GameState["encryptedAnswer"]
          | ((
              setState: GameState["encryptedAnswer"]
            ) => GameState["encryptedAnswer"])
      ) => {
        set((state: GameState) => ({
          encryptedAnswer:
            typeof setState === "function"
              ? setState(state.encryptedAnswer)
              : setState,
        }));
      },
      resetGameStoreState: (stateKey: keyof GameState) => {
        set(() => ({
          [stateKey]: initialState[stateKey],
        }));
      },
      resetAllState: () => {
        set(() => initialState);
      },
    };
  })
);
