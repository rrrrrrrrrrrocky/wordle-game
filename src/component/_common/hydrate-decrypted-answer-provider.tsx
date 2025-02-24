"use client";

import { ReactNode } from "react";

import { useHydrateDecryptedAnswer } from "@/script/hook/use-hydrate-decrypted-answer";

interface Props {
  children: ReactNode;
  decryptedAnswer: string;
  encryptedAnswer?: string;
}

const HydrateDecryptedAnswerProvider = ({
  children,
  decryptedAnswer,
  encryptedAnswer,
}: Props) => {
  useHydrateDecryptedAnswer({ decryptedAnswer, encryptedAnswer });

  return children;
};

export default HydrateDecryptedAnswerProvider;
