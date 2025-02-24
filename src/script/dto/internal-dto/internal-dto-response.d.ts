export namespace InternalDtoResponse {
  interface _Error {
    error: string;
  }
  interface _PostEncryptAnswer {
    message: string;
    data: { encryptedAnswer: string };
  }

  interface _PostDecryptAnswer {
    message: string;
    data: { decryptedAnswer: string };
  }

  type _GetRandomWords = _PostEncryptAnswer;
}
