import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { ServerStyleSheet, ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "@/utils/ThemeConfig";
import AppLayout from "@/layout/AppLayout";
import CardLayout from "@/layout/CardLayout";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoProvider from "@/contexts/TodoContext";
import StyledComponentsRegistry from "@/layout/StyledComponentsRegistry";

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <SessionProvider session={session}>
        <TodoProvider>
          <StyledComponentsRegistry>
            <AppLayout>
              <CardLayout>
                <Component {...pageProps} />
              </CardLayout>
            </AppLayout>
          </StyledComponentsRegistry>
        </TodoProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;
