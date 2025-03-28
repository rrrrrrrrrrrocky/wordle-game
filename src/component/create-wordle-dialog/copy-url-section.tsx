"use client";
import { Copy } from "lucide-react";

import { Box } from "@/component/ui/box";
import { Button } from "@/component/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/ui/dialog";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import { useToast } from "@/script/hook/ui/use-toast";
import { useClipboard } from "@/script/hook/use-clipboard";

interface Props {
  newWordleUrl: string;
}

const CopyUrlSection = ({ newWordleUrl }: Props) => {
  const { toast } = useToast();
  const { copyToClipboard, copied, error } = useClipboard();
  const onCopyUrl = () => {
    if (error) {
      console.error("copy error >>", error);
      toast({ description: "복사에 실패했습니다. 😭" });
      return;
    }
    copyToClipboard(newWordleUrl);
    toast({ description: "복사완료!" });
  };
  return (
    <Box className="flex flex-col gap-y-4">
      <DialogHeader>
        <DialogTitle>축하합니다! 🎉</DialogTitle>
        <DialogDescription>
          생성된 게임을 공유하거나 바로 이동 할 수 있습니다!
        </DialogDescription>
      </DialogHeader>
      <Box className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label className="sr-only" htmlFor="link">
            Link
          </Label>
          <Input defaultValue={newWordleUrl} id="link" disabled />
        </div>
        <Button
          className="px-3"
          data-gtm-id="create-wordle:copy-url"
          size="sm"
          variant={copied ? "black" : "outline"}
          onClick={onCopyUrl}>
          <span className="sr-only">Copy</span>
          <Copy />
        </Button>
      </Box>
    </Box>
  );
};

export default CopyUrlSection;
