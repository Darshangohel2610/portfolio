import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Hero from "./components/Hero";
import About from "./components/About";
import MyWork from "./components/MyWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ShinyText from "./components/animated_components/components/ShinyText";


function SectionWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);
  return (
    <Box ref={ref} component="section" sx={{ py: { xs: 6, md: 10 } }}>
      {children}
    </Box>
  );
}

export default function App() {
  return (
    <>
      <Hero />
      <About />
      <MyWork />
      <Contact />
      <Footer />
      <div>
        
      </div>
    </>
  );
}
