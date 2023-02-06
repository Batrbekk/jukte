import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { LoginComponents } from "../components";
import {ThemeProvider, createTheme, PaletteMode} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
const Home: NextPage = () => {
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
        <div className="min-h-screen p-4">
          <CssBaseline />
          <LoginComponents theme={theme} />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Home
