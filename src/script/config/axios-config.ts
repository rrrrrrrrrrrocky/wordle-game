import axios from "axios";

const DICTIONARY_API_BASE_URL = "https://api.dictionaryapi.dev/api";
const RANDOM_WORD_API_BASE_URL = "https://random-word-api.herokuapp.com";

export const dictionaryApiInstance = axios.create({
  baseURL: DICTIONARY_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const internalApiInstance = axios.create({
  baseURL: `/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

export const randomWordApiInstance = axios.create({
  baseURL: RANDOM_WORD_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});
