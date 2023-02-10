import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import {ThemeProvider, createTheme, PaletteMode} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import {MainView} from "../components/organisms/Main";

const Main: NextPage = () => {
  const [theme , setTheme] = useState<PaletteMode>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(darkMode ? 'dark' : 'light');
    }
  }, [theme]);

  const darkTheme = createTheme({
    palette: {
      mode: `${theme}`,
    },
  });

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">
      <ThemeProvider theme={darkTheme}>
        <div className="min-h-screen py-4">
          <CssBaseline />
          <MainView />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Main;
