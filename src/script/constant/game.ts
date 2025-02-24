export const WORD_LENGTH = 5;
export const MAX_ROW = 6;

const TOP_LINE = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"] as const;
const MIDDLE_LINE = ["A", "S", "D", "F", "G", "H", "J", "K", "L"] as const;
const BOTTOM_LINE = [
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "BACKSPACE",
] as const;

export const KEYBOARD = [TOP_LINE, MIDDLE_LINE, BOTTOM_LINE] as const;
