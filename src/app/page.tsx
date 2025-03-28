import Link from "next/link";

import Logo from "@/component/_common/header/logo";
import CreateRandomWordContainer from "@/component/create-random-word/_create-random-word-container";
import CreateWordleDialogContainer from "@/component/create-wordle-dialog/_create-wordle-dialog-container";
import { Box } from "@/component/ui/box";
import { Button } from "@/component/ui/button";
import { Container } from "@/component/ui/container";
import { Typography } from "@/component/ui/typography";

const Home = async () => {
  return (
    <Container className="p-4 container-center">
      <Logo className="size-16" />
      <Typography className="break-all" component="h2" variant="h1">
        Wordle!
      </Typography>
      <Box className="mb-12 flex">
        <Typography className="text-typo-dark-gray" component="h3" variant="h3">
          6번의 기회동안 5글자의 단어를 맞춰보세요!
        </Typography>
      </Box>

      <Box className="flex items-center justify-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/example">시작하기</Link>
        </Button>
        <CreateWordleDialogContainer />
        <CreateRandomWordContainer />
      </Box>
    </Container>
  );
};
export default Home;
