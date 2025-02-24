import { WHITESPACE_REGEX } from "../constant/regex";

export const cleanedText = (text: string) => text.replace(WHITESPACE_REGEX, ""); // 모든 공백 제거
