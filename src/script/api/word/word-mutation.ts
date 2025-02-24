import { useMutation } from "@tanstack/react-query";

import { dictionaryApiInstance } from "@/script/config/axios-config";
import { DictionaryDto } from "@/script/dto/dictionary-dto/dictionary-dto";

export const useGetWordCheck = () => {
  return useMutation({
    mutationFn: async ({ word }: DictionaryDto.Request._GetWordCheck) => {
      const { data } =
        await dictionaryApiInstance.get<DictionaryDto.Response._GetWordCheck>(
          `/v2/entries/en/${word}`
        );
      return data;
    },
  });
};
