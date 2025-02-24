import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const SCREENS = {
  xs: { min: "0px", max: "240px" }, // 375px 이하: 초소형 디바이스
  sm: { min: "241px", max: "376px" }, // 376px ~ 640px: 소형 디바이스
  md: { min: "377px", max: "640px" }, // 641px ~ 1024px: 중간 디바이스 (태블릿, 소형 노트북 등)
  lg: { min: "641px", max: "1200px" }, // 1025px ~ 1440px: 대형 디바이스 (일반 데스크탑)
  xl: { min: "1201px" }, // 1441px 이상: 초대형 디바이스
} as const;

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('/logo.svg')",
      },
      container: {
        screens: {
          // sm: "640px",
          // md: "900px",
          // lg: "1200px",
          xl: "1440px",
        },
        center: true,
      },

      screens: SCREENS,
      colors: {
        "dark-gray": "hsl(var(--dark-gray))",
        gray: "hsl(var(--gray))",
        "light-gray": "hsl(var(--light-gray))",
        typo: {
          DEFAULT: "hsl(var(--black))",
          black: "hsl(var(--black))",
          "dark-gray": "hsl(var(--dark-gray))",
          gray: "hsl(var(--gray))",
          "light-gray": "hsl(var(--light-gray))",
          white: "hsl(var(--white))",
        },
        background: {
          DEFAULT: "hsl(var(--background-default))",
          primary: "hsl(var(--background-primary))",
          foreground: "hsl(var(--background-foreground))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground-default))",
          primary: "hsl(var(--foreground-primary))",
          foreground: "hsl(var(--foreground-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        DEFAULT: "var(--font-size-md)",
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
        "7xl": "var(--font-size-7xl)",
        "8xl": "var(--font-size-8xl)",
        "9xl": "var(--font-size-9xl)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    plugin(({ addUtilities }) => {
      addUtilities({
        ".virtual-keyboard-container": {
          maxWidth: "var(--virtual-keyboard-max-width)",
          height: "200px",
          width: "100%",
          margin: "0 auto",
          padding: "8px",
          alignSelf: "stretch",
        },
        ".virtual-keyboard-top": {
          gridTemplateColumns: "repeat(10, 1fr)",
        },
        ".virtual-keyboard-middle": {
          gridTemplateColumns: "repeat(9, 1fr)",
          margin: "0 calc(var(--virtual-keyboard-max-width) / 11 / 2)",
        },
        ".virtual-keyboard-bottom": {
          gridTemplateColumns: "1.5fr repeat(7, 1fr) 1.5fr",
        },
        ".container-center": {
          display: "flex",
          flex: "1",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        "calc-screen": {
          height: `calc(100vh - var(--header-height))`,
        },
      });
    }),
  ],
} satisfies Config;
