import CryptoJS from "crypto-js";

import { CRYPTO_TEST_SECRET_KEY } from "../constant/env";

/** AES 암호화 후 URL-safe Base64 인코딩 */
export const encryptWord = (
  word: string,
  secretKey: string = CRYPTO_TEST_SECRET_KEY
): string => {
  const encrypted = CryptoJS.AES.encrypt(word, secretKey).toString();
  return btoa(encrypted) // Base64 인코딩
    .replace(/\+/g, "-") // URL 안전 문자 변환
    .replace(/\//g, "_")
    .replace(/=+$/, ""); // 패딩 제거
};

/** URL-safe Base64 디코딩 후 AES 복호화 */
export const decryptWord = (
  encodedText: string,
  secretKey: string = CRYPTO_TEST_SECRET_KEY
): string => {
  const base64 = encodedText.replace(/-/g, "+").replace(/_/g, "/"); // URL-safe Base64 복원
  const decrypted = CryptoJS.AES.decrypt(atob(base64), secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

/**
 * @deprecated 단방향 해시만 알 경우 매치된 문자의 검증이 어려움
 */
const hashWord = (word: string): string => {
  // eslint-disable-next-line new-cap
  return CryptoJS.SHA256(word).toString();
};

/**
 * @deprecated 단방향 해시만 알 경우 매치된 문자의 검증이 어려움
 * @description 입력된 단어가 맞는지 확인
 */
const _isCorrectWord = (input: string, hashedAnswer: string): boolean => {
  return hashWord(input) === hashedAnswer;
};
