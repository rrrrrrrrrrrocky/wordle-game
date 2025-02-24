import { useCallback, useState } from "react";

/**
 * 클립보드에 텍스트를 복사하는 React 훅
 * @returns {copyToClipboard, copied, error}
 */
export const useClipboard = (resetClipboardDelay: number = 2000) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        if (!navigator.clipboard) {
          throw new Error("Clipboard API not supported");
        }

        await navigator.clipboard.writeText(text);
        setCopied(true);

        // 일정 시간 후 copied 상태 초기화
        setTimeout(() => setCopied(false), resetClipboardDelay);
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [resetClipboardDelay]
  );

  return { copyToClipboard, copied, error };
};
