import "@/resource/style/global.css";
import "dayjs/locale/ko";

import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Noto_Sans as notoSansFont } from "next/font/google";
import { useMemo } from "react";

import HeaderContainer from "@/component/_common/header/_header-container";
import { Container } from "@/component/ui/container";
import { Typography } from "@/component/ui/typography";
import {
  AUTHOR,
  DEFAULT_OPEN_GRAPH,
  DEFAULT_SITE_DESCRIPTION,
  DEFAULT_SITE_KEYWORDS,
  DEFAULT_SITE_TITLE,
  DEFAULT_TWITTER_CARD,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: DEFAULT_SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  keywords: DEFAULT_SITE_KEYWORDS,
  publisher: AUTHOR,
  openGraph: DEFAULT_OPEN_GRAPH,
  twitter: DEFAULT_TWITTER_CARD,

  // root도메인에 등록 완료
  // verification: {},
  manifest: "/meta/site.webmanifest",
  robots: "index, follow",
  metadataBase: new URL(SITE_URL),
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isProd = process.env.NODE_ENV === "production";

  const header = useMemo(() => <HeaderContainer />, []);

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta
          content="no-cache, no-store, must-revalidate"
          httpEquiv="Cache-Control"
        />
        <meta content="no-cache" httpEquiv="Pragma" />
        <meta content="0" httpEquiv="Expires" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        {/* Google Tag Manager (ga는 gtm 컨테이너에서 설치, gtag대신 dataLayer 사용) */}
        {isProd && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-5RG9SV44');
              `,
            }}
          />
        )}
        {isProd && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "qv778zdasv");
              `,
            }}
            id="clarity-script"
          />
        )}
        <link
          href="/meta/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/meta/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="/meta/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link href="/meta/favicon.ico" rel="shortcut icon" />
      </head>
      <body
        className={`${notoSans.className} relative flex min-h-screen flex-col bg-background antialiased`}>
        {isProd && (
          <noscript>
            <iframe
              className="invisible hidden"
              height="0"
              src="https://www.googletagmanager.com/ns.html?id=GTM-5RG9SV44"
              width="0"
            />
          </noscript>
        )}

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
