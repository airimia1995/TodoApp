import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "@/utils/ThemeConfig";
import AppLayout from "@/layout/AppLayout";
import CardLayout from "@/layout/CardLayout";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoProvider from "@/contexts/TodoContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <SessionProvider session={session}>
        <TodoProvider>
          <AppLayout>
            <CardLayout>
              <Component {...pageProps} />
            </CardLayout>
          </AppLayout>
        </TodoProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
