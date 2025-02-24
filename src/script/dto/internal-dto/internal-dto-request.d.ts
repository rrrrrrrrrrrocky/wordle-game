import { RandomWordDto } from "../random-word-dto/random-word-dto";

export namespace InternalDtoRequest {
  interface _PostEncryptAnswer {
    originalAnswer: string;
  }

  interface _PostDecryptAnswer {
    cipherText: string;
  }

  type _GetRandomWords = RandomWordDto.Request._GetRandomWords;
}
