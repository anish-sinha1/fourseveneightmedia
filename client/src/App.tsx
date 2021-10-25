import React, { Fragment, useMemo } from "react";

import Navbar from "./components/ui/navbar";
import DarkModeSwitch from "./components/preferences/dark-mode-switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import { useAppSelector } from "./app/hooks";

const App: React.FC = () => {
  const darkModeEnabled = useAppSelector((state) => state.preferences.darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: !darkModeEnabled ? "dark" : "light",
        },
      }),
    [darkModeEnabled]
  );

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          <DarkModeSwitch />
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
