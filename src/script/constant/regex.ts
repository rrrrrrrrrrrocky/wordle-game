import { WORD_LENGTH } from "./game";

export const ENGLISH_SINGLE_LETTER_REGEX = /^[a-zA-Z]$/;
export const ENGLISH_REGEX = /^[a-zA-Z]+$/;
export const ENGLISH_WORD_REGEX = new RegExp(`^[a-zA-Z]{${WORD_LENGTH}}$`);

export const WHITESPACE_REGEX = /\s+/g;
