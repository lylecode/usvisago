"use client";
import NextTopLoader from "nextjs-toploader";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <>
      <HeroUIProvider navigate={router.push} locale="zh-CN">
        <NextThemesProvider attribute="class" defaultTheme="light">
          <ToastProvider
            placement="top-center"
            toastProps={{
              variant: "flat",
              classNames: {
                closeButton:
                  "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
              },
            }}
          />
          <NextTopLoader showSpinner={false} />
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}
