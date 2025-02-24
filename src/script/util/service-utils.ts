import dayjs from "dayjs";

import { WORD_LENGTH } from "../constant/game";
import { MatchType } from "../type/game";

export const compareAnswer = (
  submitWord: string,
  answer: string,
  wordLength: number = WORD_LENGTH
): Array<MatchType> => {
  const result = Array(wordLength).fill("NOT_MATCHED");
  const upperCaseAnswer = answer.toUpperCase();
  const upperCaseSubmitWord = submitWord.toUpperCase();
  const unmatchedInAnswer = upperCaseAnswer.split("");

  // Step 1: Check for matched letters (same position and value)
  for (let i = 0; i < wordLength; i++) {
    if (upperCaseSubmitWord[i] === upperCaseAnswer[i]) {
      result[i] = "MATCHED";
      unmatchedInAnswer[i] = ""; // 이미 처리된 문자 제거
    }
  }

  // Step 2: Check for partial-matched letters (same value, different position)
  for (let i = 0; i < wordLength; i++) {
    if (result[i] === "NOT_MATCHED") {
      const partialMatchIndex = unmatchedInAnswer.indexOf(
        upperCaseSubmitWord[i]
      );
      if (partialMatchIndex !== -1) {
        result[i] = "PARTIAL_MATCHED";
        unmatchedInAnswer[partialMatchIndex] = ""; // 처리된 문자 제거
      }
    }
  }

  return result;
};

export const getGameDuration = ({
  startTime,
  endTime,
}: {
  startTime: number;
  endTime: number;
}): string => {
  // 입력 검증 (올바른 숫자인지 체크)
  if (
    typeof startTime !== "number" ||
    typeof endTime !== "number" ||
    isNaN(startTime) ||
    isNaN(endTime) ||
    startTime < 0 ||
    endTime < 0 ||
    startTime > endTime
  ) {
    return "";
  }

  const durationInSeconds = dayjs(endTime).diff(dayjs(startTime), "second"); // 총 시간 차이 (초)

  const days = Math.floor(durationInSeconds / (60 * 60 * 24)); // 일 단위
  const hours = Math.floor((durationInSeconds % (60 * 60 * 24)) / (60 * 60)); // 시간 단위
  const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60); // 분 단위
  const seconds = durationInSeconds % 60; // 초 단위

  let result = "";
  if (days > 0) result += `${days}일 `;
  if (hours > 0) result += `${hours}시간 `;
  if (minutes > 0) result += `${minutes}분 `;
  if (seconds > 0 || result === "") result += `${seconds}초`; // 0초일 경우도 포함

  return result.trim();
};

export const calculateWinRate = (wins: number, totalGames: number): number => {
  if (
    typeof wins !== "number" ||
    typeof totalGames !== "number" ||
    isNaN(wins) ||
    isNaN(totalGames) ||
    wins < 0 ||
    totalGames <= 0 ||
    wins > totalGames
  ) {
    return 0;
  }

  return (wins / totalGames) * 100;
};

export const formatWinRate = (
  wins: number,
  totalGames: number,
  toFixed: number = 1
): string => {
  const winRate = calculateWinRate(wins, totalGames);
  return `${winRate.toFixed(toFixed)}%`;
};
