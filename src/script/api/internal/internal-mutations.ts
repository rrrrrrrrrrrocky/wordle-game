import { useMutation } from "@tanstack/react-query";

import { internalApiInstance } from "@/script/config/axios-config";
import { WORD_LENGTH } from "@/script/constant/game";
import { CommonDto } from "@/script/dto/common-dto";
import { InternalDto } from "@/script/dto/internal-dto/internal-dto";

export const usePostEncryptAnswer = () => {
  return useMutation<
    InternalDto.Response._PostEncryptAnswer,
    CommonDto._CustomAxiosError<{ error: string }>,
    InternalDto.Request._PostEncryptAnswer
  >({
    mutationFn: async ({
      originalAnswer,
    }: InternalDto.Request._PostEncryptAnswer) => {
      const { data } = await internalApiInstance.post("/answer/encrypt", {
        originalAnswer,
      });
      return data;
    },
  });
};

export const usePostDecryptAnswer = () => {
  return useMutation<
    InternalDto.Response._PostDecryptAnswer,
    CommonDto._CustomAxiosError<{ error: string }>,
    InternalDto.Request._PostDecryptAnswer
  >({
    mutationFn: async ({
      cipherText,
    }: InternalDto.Request._PostDecryptAnswer) => {
      const { data } = await internalApiInstance.post("/answer/decrypt", {
        cipherText,
      });
      return data;
    },
  });
};

export const useGetRandomWord = () => {
  return useMutation<
    InternalDto.Response._GetRandomWords,
    CommonDto._CustomAxiosError<{ error: string }>,
    Partial<InternalDto.Request._GetRandomWords> | void
  >({
    mutationFn: async (
      params?: Partial<InternalDto.Request._GetRandomWords> | void
    ) => {
      const defaultWordLength = WORD_LENGTH.toString();
      const number = params?.number?.toString() || "1";
      const length = params?.length?.toString() || defaultWordLength;

      const { data } = await internalApiInstance.get("/words/random", {
        params: new URLSearchParams({
          number,
          length,
        }),
      });
      return data;
    },
  });
};
