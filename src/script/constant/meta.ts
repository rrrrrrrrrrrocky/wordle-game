import { Metadata } from "next";

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://game.rrrrrrrrrrr.xyz"
    : "http://localhost:3000";
export const DEFAULT_SITE_TITLE =
  "6번의 기회동안 5글자의 단어를 맞춰보세요! | Wordle Game";
export const DEFAULT_SITE_NAME =
  "6번의 기회동안 5글자의 단어를 맞춰보세요! | Wordle Game";

export const DEFAULT_SITE_DESCRIPTION =
  "6번의 기회동안 5글자의 단어를 맞춰보세요! - 문제가 어려우면 미니게임으로 힌트를 받을 수 있어요!";
export const AUTHOR = "rrrrrrrrrrrocky";
export const EMAIL = "rrrrrrrrrrrocky@gmail.com";
export const GITHUB_URL = "https://github.com/rrrrrrrrrrrocky";

export const SITE_MAP = `${SITE_URL}/sitemap.xml`;

export const DEFAULT_SITE_KEYWORDS = [
  "Wordle",
  "게임",
  "워들",
  "워들 게임",
  "워들 게임 소개",
  "미니 게임",
  "동체시력 게임",
  "타이머 게임",
];

export const DEFAULT_OG_IMAGE_URL = "/meta/default-og-image.png";
export const DEFAULT_OPEN_GRAPH: Metadata["openGraph"] = {
  title: DEFAULT_SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
  images: {
    url: DEFAULT_OG_IMAGE_URL,
    // url: "http://localhost:3000/default-og-image.png",
    width: 1200,
    height: 630,
    alt: DEFAULT_SITE_TITLE,
  },
  type: "website",
  siteName: DEFAULT_SITE_NAME,
  locale: "ko_KR",
};

export const DEFAULT_TWITTER_CARD: Metadata["twitter"] = {
  card: "summary_large_image",
  title: DEFAULT_SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
  images: [DEFAULT_OG_IMAGE_URL],
};
