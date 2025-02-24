"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

import { Box } from "@/component/ui/box";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";

const ButtonSection = () => {
  const { setTheme, resolvedTheme, theme } = useTheme();

  return (
    <Box className="flex items-center gap-x-4">
      <Select defaultValue={theme || "system"} onValueChange={setTheme}>
        <SelectTrigger className="w-fit" isArrowIcon={false} size="sm">
          <SelectValue asChild>
            {resolvedTheme === "dark" ? (
              <Moon className="size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            ) : (
              <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            )}
          </SelectValue>
          <span className="sr-only">Toggle theme</span>
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="light">라이트 모드</SelectItem>
          <SelectItem value="dark">다크 모드</SelectItem>
          <SelectItem value="system">시스템 설정</SelectItem>
        </SelectContent>
      </Select>
    </Box>
  );
};

export default ButtonSection;
