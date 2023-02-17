import { createGlobalStyle } from "styled-components"

export const colors = {
    white: '#fff',
    lightGrey: '#f6f7f8',
    dark: '#1f2a4b',
    grey: '#9ea3b2',
    blue: '#4a77e5',
}
export const lightTheme = {
    body: colors.lightGrey,
    text: colors.dark,
}

export const GlobalStyles = createGlobalStyle<{ theme: { body: string, text: string } }>`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: MarkPro;
  }
  @font-face {
    font-family: MarkPro;
    src: url('/fonts/MarkPro.ttf');
    font-weight: normal;
    font-style: normal;
  }
`