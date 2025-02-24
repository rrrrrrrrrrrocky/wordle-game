import { Info } from "lucide-react";

import BoardContainer from "@/component/_common/board/_board-container";
import HydrateDecryptedAnswerProvider from "@/component/_common/hydrate-decrypted-answer-provider";
import VirtualKeyboardContainer from "@/component/_common/virtual-keyboard/_virtual-keyboard-container";
import { Box } from "@/component/ui/box";
import { Container } from "@/component/ui/container";
import { Typography } from "@/component/ui/typography";

const ExamplePage = () => {
  return (
    <Container className="gap-y-16 p-2 container-center">
      <HydrateDecryptedAnswerProvider decryptedAnswer="world">
        <Box className="flex items-center gap-x-2">
          <Info className="text-muted-foreground" size={20} />
          <Typography className="font-bold text-muted-foreground" variant="p">
            샘플페이지는 결과 집계를 하지 않습니다.
          </Typography>
        </Box>
        <BoardContainer />
        <VirtualKeyboardContainer />
      </HydrateDecryptedAnswerProvider>
    </Container>
  );
};

export default ExamplePage;
