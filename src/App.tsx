import { Box, IconButton } from "@mui/material";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/MyWork/Experience";
import Projects from "./components/MyWork/Projects";
import Testimonials from "./components/MyWork/Testimonials";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useColorMode } from "./styles/colorMode";
import Navbar from "./components/Navbar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function App() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box id="top" />
      <Navbar />

      <Box>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Testimonials />
        <Skills />
        <Contact />
        <Footer />
      </Box>

      {/* Modern floating theme toggle button */}
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        sx={(theme) => ({
          position: "fixed",
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          zIndex: theme.zIndex.appBar + 2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(36,45,62,0.85)' : 'rgba(246,244,238,0.85)',
          backdropFilter: 'blur(8px)',
          border: '2px solid',
          borderColor: theme.palette.text.primary,
          boxShadow: `3px 3px 0px 0px ${theme.palette.text.primary}`,
          borderRadius: 0,
          p: { xs: 1, md: 1.5 },
          transition: 'transform 0.1s, box-shadow 0.1s',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(36,45,62,0.95)' : 'rgba(246,244,238,0.95)',
            transform: 'translate(-2px, -2px)',
            boxShadow: `5px 5px 0px 0px ${theme.palette.text.primary}`,
          },
          '&:active': {
            transform: 'translate(2px, 2px)',
            boxShadow: '0px 0px 0px 0px currentColor',
          }
        })}
      >
        {mode === "dark" ? <LightModeIcon sx={{ fontSize: { xs: 20, md: 24 } }} /> : <DarkModeIcon sx={{ fontSize: { xs: 20, md: 24 } }} />}
      </IconButton>
    </>
  );
}
