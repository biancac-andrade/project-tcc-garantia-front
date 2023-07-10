/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  /* Estilos globais aqui */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  /* Outros estilos globais... */
`;

export const StyledProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
