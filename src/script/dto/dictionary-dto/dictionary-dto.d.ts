import { DictionaryDtoRequest } from "./dictionary-dto-request";
import { DictionaryDtoResponse } from "./dictionary-dto-response";

export namespace DictionaryDto {
  interface Phonetics {
    text: string;
    audio: string;
    sourceUrl?: string;
    license?: {
      name: string;
      url: string;
    };
  }

  interface Definitions {
    definition: string;
    synonyms: Array<unknown>;
    antonyms: Array<unknown>;
    example?: string;
  }

  interface Meanings {
    partOfSpeech: string;
    definitions: Array<Definitions>;
    synonyms: Array<string>;
    antonyms: Array<unknown>;
  }

  interface _WordCheckData {
    word: string;
    phonetic: string;
    phonetics: Array<Phonetics>;
    meanings: Array<Meanings>;
    license: {
      name: string;
      url: string;
    };
    sourceUrls: Array<string>;
  }

  export import Request = DictionaryDtoRequest;
  export import Response = DictionaryDtoResponse;
}
