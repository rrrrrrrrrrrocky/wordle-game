"use client";

import "dayjs/locale/ko";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

import useMount from "@/script/hook/use-mount";

import { Toaster } from "../ui/toaster";

interface ClientProviderProps {
  children: ReactNode;
}

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const ClientProvider = ({ children }: ClientProviderProps) => {
  const queryClient = getQueryClient();
  const { mounted } = useMount();

  return (
    <QueryClientProvider client={queryClient}>
      {mounted ? (
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          storageKey="philos-design-theme"
          disableTransitionOnChange
          enableSystem>
          {children}

          <Toaster />
        </NextThemesProvider>
      ) : (
        children
      )}
    </QueryClientProvider>
  );
};

export default ClientProvider;
