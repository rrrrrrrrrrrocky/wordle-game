// TypeScript로 sitemap.ts 작성

import { MetadataRoute } from "next";

// import path from "path";
import { SITE_URL } from "@/script/constant/meta";
import { convertToKoreanTimeDayjs } from "@/script/util/date-utils";

type Sitemap = MetadataRoute.Sitemap;

/**
 * next에서 제공하는 sitemap.ts는 "export: output"으로 안 할 경우
 * static 폴더에 sitemap.xml을 만들어주지 않아서 강제로 파일시스템에 파일을 생성하는 형태로 테스트중 (google-search-console에서 읽을 수 있도록)
 * @returns {Promise<Sitemap>} return은 파일시스템에 sitemap.xml이 있을 경우 무시됨
 */
const sitemap = async (): Promise<Sitemap> => {
  const koreanTime = convertToKoreanTimeDayjs().format("YYYY-MM-DD");

  // 정적 페이지 정의 (중앙 집중식 관리)
  const STATIC_PAGES = [
    { path: "/", priority: 1.0 }, // 홈페이지
    { path: "/example", priority: 0.7 },
  ];

  // 정적 페이지 URL 생성
  const staticUrls: Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: koreanTime,
    changeFrequency: "weekly", // 정적 페이지는 변경 빈도 낮춤
    priority: page.priority,
  }));

  return staticUrls;
};

export default sitemap;
