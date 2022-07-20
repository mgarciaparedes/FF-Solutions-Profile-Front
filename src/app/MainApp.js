import React from "react";
import RouteApp from "./RouteApp";
import { Router } from "react-router-dom";
import history from "../components/History";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


/*Componente nucleo de nuestra app*/
export const MainApp = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <CssBaseline /> */}
      <Router history={history}>
        <RouteApp />
      </Router>
    </ThemeProvider>
  );
};
