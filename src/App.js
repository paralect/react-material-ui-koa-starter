import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import theme from 'styles/theme';

import Router from './Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <ReactQueryDevtools position="bottom-right" />
        <CssBaseline />
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
