import { KEYBOARD } from "../constant/game";

export type MatchType =
  | "MATCHED"
  | "PARTIAL_MATCHED"
  | "NOT_MATCHED"
  | "UNKNOWN";

export type VirtualKeyboardKey = (typeof KEYBOARD)[number][number];

export type WordCheckResult = "VALID" | "INVALID" | "ERROR";
