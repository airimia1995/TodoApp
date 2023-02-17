import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "@/utils/ThemeConfig";
import AppLayout from "@/layout/AppLayout";


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <SessionProvider session={session}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SessionProvider>
    </ThemeProvider>
  );
}
