import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { LoginView } from "../components/organisms/Login";
import { motion } from "framer-motion"

const Login: NextPage = () => {
  const [theme , setTheme] = useState<PaletteMode>('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(darkMode ? 'dark' : 'light');
    }
  }, [theme]);

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }

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
          <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: 'linear' }}
            className=""
          >
            <LoginView />
          </motion.main>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default Login;
