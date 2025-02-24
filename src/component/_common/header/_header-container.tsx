import { Box } from "@/component/ui/box";
import { Container } from "@/component/ui/container";

import ButtonSection from "./button-section";
import LogoSection from "./logo-section";

const HeaderContainer = () => {
  return (
    <Container
      className="fixed top-0 z-50 flex h-14 w-full items-center justify-between bg-background shadow-md dark:border-b dark:border-b-gray"
      component="header"
      fullSize>
      <Box className="flex w-full items-center justify-between px-4">
        <LogoSection />
        <Box className="flex items-center justify-end gap-x-2">
          <ButtonSection />
        </Box>
      </Box>
    </Container>
  );
};

export default HeaderContainer;
