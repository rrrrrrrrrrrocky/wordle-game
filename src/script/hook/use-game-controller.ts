"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import {
  usePostDecryptAnswer,
  usePostEncryptAnswer,
} from "../api/internal/internal-mutations";
import { useGetWordCheck } from "../api/word/word-mutation";
import { MAX_ROW, WORD_LENGTH } from "../constant/game";
import { ENGLISH_SINGLE_LETTER_REGEX } from "../constant/regex";
import { CommonDto } from "../dto/common-dto";
import { MatchType, VirtualKeyboardKey, WordCheckResult } from "../type/game";
import { compareAnswer } from "../util/service-utils";
import { GameState, useGameStore } from "./store/use-game-store";
import { useToast } from "./ui/use-toast";
import { useGameStatController } from "./use-game-stat-controller";

interface UseGameControllerReturn {
  onChangeLetter: (letter: string) => void;
  deleteLetter: () => void;
  onSubmitChallenge: () => void;
  encryptAnswer: (originalAnswer: string) => Promise<string>;
  decryptAnswer: (cipherText: string) => Promise<string>;
  gameBoard: GameState["gameBoard"];
  virtualKeyboard: GameState["virtualKeyboard"];
  decryptedAnswer: GameState["decryptedAnswer"];
  validateWord: (word: string) => Promise<WordCheckResult>;
  isPending: boolean;
  resetGameStoreState: (gameState: keyof GameState) => void;
  resetAllState: () => void;
}

export const useGameController = (): UseGameControllerReturn => {
  const { replace } = useRouter();
  const { toast } = useToast();
  const {
    gameBoard,
    setLetterPosition,
    challengeCount,
    setChallengeCount,
    letterPosition,
    setGameBoard,
    decryptedAnswer,
    virtualKeyboard,
    setVirtualKeyboard,
    setDecryptedAnswer,
    encryptedAnswer,
    resetGameStoreState,
    resetAllState,
  } = useGameStore(useShallow((state) => state));

  const { updateGameSession, updateGameStat, addGameHistory } =
    useGameStatController();

  const { mutateAsync: getWordCheck, isPending: isWordCheckPending } =
    useGetWordCheck();

  const {
    mutateAsync: postEncryptAnswer,
    isPending: isPostEncryptAnswerPending,
  } = usePostEncryptAnswer();
  const {
    mutateAsync: postDecryptAnswer,
    isPending: isPostDecryptAnswerPending,
  } = usePostDecryptAnswer();

  const isPending = useMemo(() => {
    return (
      isWordCheckPending ||
      isPostEncryptAnswerPending ||
      isPostDecryptAnswerPending
    );
  }, [
    isPostDecryptAnswerPending,
    isPostEncryptAnswerPending,
    isWordCheckPending,
  ]);

  const openResultDialog = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("result", "true");

    replace(url.toString(), { scroll: false });
  }, [replace]);

  const encryptAnswer = useCallback(
    async (originalAnswer: string) => {
      try {
        const { data } = await postEncryptAnswer({ originalAnswer });
        return data.encryptedAnswer;
      } catch (err) {
        console.error("failed encrypt >>", err);
        toast({ description: "정답을 암호화하는데 실패했습니다." });
        return "";
      }
    },
    [postEncryptAnswer, toast]
  );

  const decryptAnswer = useCallback(
    async (cipherText: string): Promise<string> => {
      try {
        const { data } = await postDecryptAnswer({ cipherText });
        setDecryptedAnswer(data.decryptedAnswer);
        return data.decryptedAnswer;
      } catch (err) {
        console.error("failed encrypt >>", err);
        toast({ description: "정답을 복호화하는데 실패했습니다." });
        return "";
      }
    },
    [postDecryptAnswer, setDecryptedAnswer, toast]
  );

  const updateLetterPosition = useCallback(
    (delta: number) => {
      setLetterPosition((prev) =>
        Math.max(0, Math.min(prev + delta, WORD_LENGTH))
      );
    },
    [setLetterPosition]
  );

  const updateLetter = useCallback(
    (focusChallengeIndex: number, focusLetterIndex: number, letter: string) => {
      const upperCaseWord = letter.toUpperCase();
      const newGameBoard = gameBoard.map((challenge, challengeIndex) =>
        challenge.map((gameData, letterIndex) => ({
          ...gameData,
          letter:
            challengeIndex === focusChallengeIndex &&
            letterIndex === focusLetterIndex
              ? upperCaseWord
              : gameData.letter,
        }))
      );
      setGameBoard(newGameBoard);
    },
    [gameBoard, setGameBoard]
  );

  const updateVirtualKeyboard = (
    board: GameState["gameBoard"]
  ): Partial<Record<VirtualKeyboardKey, MatchType>> => {
    const keyboardKeyStatus = board
      .flat()
      .filter(({ letter }) => letter)
      .reduce<Partial<Record<VirtualKeyboardKey, MatchType>>>(
        (keyStatusMap, cell) => {
          const letterKey = cell.letter as VirtualKeyboardKey;
          const existingStatus = keyStatusMap[letterKey];

          if (!existingStatus) {
            keyStatusMap[letterKey] = cell.compareAnswer;
            return keyStatusMap;
          }

          // MATCHED 우선순위가 가장 높음
          if (
            cell.compareAnswer === "MATCHED" ||
            existingStatus === "MATCHED"
          ) {
            keyStatusMap[letterKey] = "MATCHED";
          } else if (
            cell.compareAnswer === "PARTIAL_MATCHED" ||
            existingStatus === "PARTIAL_MATCHED"
          ) {
            keyStatusMap[letterKey] = "PARTIAL_MATCHED";
          } else {
            keyStatusMap[letterKey] = "NOT_MATCHED";
          }

          return keyStatusMap;
        },
        {}
      );

    return keyboardKeyStatus;
  };

  const onChangeLetter = useCallback<UseGameControllerReturn["onChangeLetter"]>(
    (letter) => {
      if (!ENGLISH_SINGLE_LETTER_REGEX.test(letter) || isPending) {
        return;
      }

      const lastValue = gameBoard[challengeCount][WORD_LENGTH - 1].letter || "";
      if (lastValue) return;

      updateLetter(challengeCount, letterPosition, letter);
      updateLetterPosition(1);
    },
    [
      isPending,
      gameBoard,
      challengeCount,
      updateLetter,
      letterPosition,
      updateLetterPosition,
    ]
  );

  const validateWord = useCallback<UseGameControllerReturn["validateWord"]>(
    async (word) => {
      try {
        // TODO: debounce
        await getWordCheck({ word });
        return "VALID";
      } catch (error) {
        const err = error as CommonDto._CustomAxiosError;
        return err.status === 404 ? "INVALID" : "ERROR";
      }
    },
    [getWordCheck]
  );

  const deleteLetter = useCallback<
    UseGameControllerReturn["deleteLetter"]
  >(() => {
    if (isPending) return;
    updateLetter(challengeCount, letterPosition - 1, "");
    updateLetterPosition(-1);
  }, [
    isPending,
    updateLetter,
    challengeCount,
    letterPosition,
    updateLetterPosition,
  ]);

  const onSubmitChallenge = useCallback<
    UseGameControllerReturn["onSubmitChallenge"]
  >(async () => {
    if (isPending) return;

    const submitWord = gameBoard[challengeCount]
      .map(({ letter }) => letter)
      .join("");

    if (decryptedAnswer.length !== WORD_LENGTH) {
      throw new Error("정답을 확인해주세요 ");
    }

    if (submitWord.length !== WORD_LENGTH) {
      toast({ description: `${WORD_LENGTH}글자가 입력되지 않았습니다 😭` });
      return;
    }

    const wordCheckResult = await validateWord(submitWord);

    if (wordCheckResult === "INVALID") {
      toast({ description: "단어를 찾을 수 없습니다 😢" });
      return;
    }

    if (wordCheckResult === "ERROR") {
      toast({ description: "단어 검증에 실패했습니다 😱" });
      return;
    }

    const newGameBoard = gameBoard.map((challenge, challengeIndex) =>
      challenge.map(
        (gameData, letterIndex): GameState["gameBoard"][number][number] => ({
          ...gameData,
          compareAnswer:
            challengeIndex === challengeCount
              ? compareAnswer(submitWord, decryptedAnswer)[letterIndex]
              : gameData.compareAnswer,
        })
      )
    );

    const newVirtualKeyboardStatus = updateVirtualKeyboard(newGameBoard);

    setVirtualKeyboard((prevVirtualKeyboard) => {
      return prevVirtualKeyboard.map((keyboard) => {
        return keyboard.map((keyData) => {
          const [key] = Object.keys(keyData);
          const changedKeyStatus =
            newVirtualKeyboardStatus?.[key as VirtualKeyboardKey];
          if (changedKeyStatus) {
            return {
              ...keyData,
              [key]: changedKeyStatus,
            };
          } else {
            return keyData;
          }
        });
      });
    });
    setGameBoard(newGameBoard);

    if (decryptedAnswer === submitWord) {
      addGameHistory({
        challengeId: encryptedAnswer,
        attempts: challengeCount,
        isSuccess: true,
      });

      updateGameStat({
        challengeCount,
        isWin: true,
      });

      openResultDialog();
    } else if (challengeCount === MAX_ROW - 1) {
      addGameHistory({
        challengeId: encryptedAnswer,
        attempts: challengeCount,
        isSuccess: false,
      });
      updateGameStat({
        challengeCount,
        isWin: false,
      });

      openResultDialog();
    } else {
      if (challengeCount < MAX_ROW - 1) {
        setChallengeCount((prev) => prev + 1);
      }
      updateGameSession({
        challengeCount: challengeCount + 1,
        challengeId: encryptedAnswer,
        gameBoard: newGameBoard,
      });
      resetGameStoreState("letterPosition");
    }
  }, [
    addGameHistory,
    challengeCount,
    decryptedAnswer,
    encryptedAnswer,
    gameBoard,
    isPending,
    openResultDialog,
    resetGameStoreState,
    setChallengeCount,
    setGameBoard,
    setVirtualKeyboard,
    toast,
    updateGameSession,
    updateGameStat,
    validateWord,
  ]);

  return {
    isPending,
    validateWord,
    decryptedAnswer,
    encryptAnswer,
    decryptAnswer,
    gameBoard,
    onChangeLetter,
    deleteLetter,
    onSubmitChallenge,
    virtualKeyboard,
    resetGameStoreState,
    resetAllState,
  };
};
