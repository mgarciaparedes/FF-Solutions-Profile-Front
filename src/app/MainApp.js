import React from "react";
import RouteApp from "./RouteApp";
import { Router } from "react-router-dom";
import history from "../components/History";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#dfb05a", light: "#42a5f5" },
  },
  components: {
    // Name of the component
    MuiLink: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textDecoration: 'none',
        },
      },
    },
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
