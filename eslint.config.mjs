import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";
import reactQuery from "@tanstack/eslint-plugin-query";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.typescript,
  ...rrrrrrrrrrr.configs.next,
  ...tailwind.configs["flat/recommended"],
  ...reactQuery.configs["flat/recommended"],
  {
    ignores: ["*.cjs", "node_modules", "dist", ".next", ".github"],
  },
  {
    rules: {
      // 타입스크립트를 사용 할 경우, 타입스크립트의 @typescript-eslint/no-unused-vars를 사용하도록 처리
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          // ignoreRestSiblings: true, // 구조 분해 할당 시 나머지 연산자 사용을 허용하여 경고 무시
        },
      ],
      // console.log는 에러로 처리, 다른 console.*은 허용
      "no-console": [
        "error",
        {
          allow: [
            "warn",
            "error",
            "info",
            "debug",
            "trace",
            "group",
            "groupEnd",
          ],
        },
      ],
    },
    settings: {
      tailwindcss: {
        // These are the default values but feel free to customize
        callees: ["classnames", "clsx", "cn", "sx", "style"],
        config: "tailwind.config.ts", // returned from `loadConfig()` utility if not provided
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        cssFilesRefreshRate: 5_000,
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
        classRegex: "^(class(Name)?|sx|style|[a-zA-Z]+(Style|Styles))$",
      },
    },
  },
];

export default eslintConfig;
