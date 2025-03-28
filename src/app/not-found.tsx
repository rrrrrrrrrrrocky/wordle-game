"use client";

import Link from "next/link";

import { Button } from "@/component/ui/button";
import { Container } from "@/component/ui/container";
import { Typography } from "@/component/ui/typography";

const NotFound = () => {
  return (
    <Container
      className="flex flex-1 flex-col items-center justify-center p-4"
      component="main">
      <Typography
        className="mb-4 text-4xl font-bold"
        component="h2"
        variant="h2">
        404
      </Typography>
      <Typography className="mb-4 text-gray" component="p" variant="p">
        페이지를 찾을 수 없습니다.
      </Typography>
      <Button data-gtm-id="not-found-go-to-home" variant="destructive" asChild>
        <Link href="/" replace>
          홈으로 돌아가기
        </Link>
      </Button>
    </Container>
  );
};

export default NotFound;
