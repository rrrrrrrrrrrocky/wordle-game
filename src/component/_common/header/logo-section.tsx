import Link from "next/link";

import Logo from "./logo";

const LogoSection = () => {
  return (
    <Link
      className="flex cursor-pointer items-center justify-start gap-x-1"
      href={{
        pathname: "/",
      }}>
      <Logo />
    </Link>
  );
};

export default LogoSection;
