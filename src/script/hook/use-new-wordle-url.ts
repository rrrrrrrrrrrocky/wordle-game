"use client";

import { useCallback, useState } from "react";

export const useNewWordleUrl = () => {
  const [newWordleUrl, setNewWordleUrl] = useState<string>("");

  const handleNewWordleUrl = useCallback((encryptedAnswer: string) => {
    if (typeof window === "undefined") {
      throw new Error("window not defined");
    }
    if (encryptedAnswer) {
      setNewWordleUrl(`${window.location.origin}/${encryptedAnswer}`);
    } else {
      return "";
    }
  }, []);
  return { newWordleUrl, handleNewWordleUrl };
};
