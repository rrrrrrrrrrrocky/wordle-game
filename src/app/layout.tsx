import "@/resource/style/global.css";
import "dayjs/locale/ko";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Noto_Sans as notoSansFont } from "next/font/google";
import { useMemo } from "react";

import HeaderContainer from "@/component/_common/header/_header-container";
import { Container } from "@/component/ui/container";
import { Typography } from "@/component/ui/typography";
import {
  EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE_URL,
  SITE_URL,
} from "@/script/constant/meta";

const ClientProvider = dynamic(
  () => import("@/component/_common/client-provider"),
  {}
);

const notoSans = notoSansFont({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: SITE_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    siteName: SITE_NAME,
    locale: "ko_KR",
    emails: EMAIL,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const header = useMemo(() => <HeaderContainer />, []);

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="no-cache" httpEquiv="Pragma" />
        <meta
          content="no-cache, no-store, must-revalidate"
          httpEquiv="cache-control"
        />
        <meta content="#000000" name="msapplication-TileColor" />
        <meta content="#000" name="theme-color" />
      </head>
      <body
        className={`${notoSans.className} relative flex min-h-screen flex-col bg-background antialiased`}>
        <ClientProvider>
          {header}

          <Container
            className="hidden items-center justify-center xs:mt-14 xs:flex xs:flex-1 xs:flex-col"
            component="main">
            <Typography component="h1" variant="h2">
              화면이 너무 작아요..😢
            </Typography>
          </Container>
          <Container
            className="mt-14 flex flex-1 flex-col xs:hidden"
            component="main">
            {children}
          </Container>
        </ClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
