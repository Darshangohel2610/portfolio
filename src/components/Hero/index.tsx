import { Box, Button, Container, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useColorMode } from "../../styles/colorMode";

function PixelCloud1() {
  return (
    <svg width="120" height="60" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path d="M16 4h16v4H16V4zm-8 4h32v4H8V8zm-4 4h40v4H4v-4zm-2 4h44v4H2v-4zm0 4h44v4H2v-4z" fill="currentColor" />
    </svg>
  );
}

function PixelCloud2() {
  return (
    <svg width="180" height="90" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path d="M20 6h24v4H20V6zm-10 4h44v4H10v-4zm-6 4h52v4H4v-4zm-2 4h56v4H2v-4zm0 4h56v4H2v-4zm2 4h52v4H4v-4z" fill="currentColor" />
    </svg>
  );
}

function PixelCharacter() {
  return (
    <svg width="140" height="140" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', display: 'block', margin: '0 auto' }}>
      {/* Cloud */}
      <rect x="4" y="24" width="24" height="5" fill="#FFFFFF" />
      <rect x="6" y="22" width="20" height="2" fill="#FFFFFF" />
      <rect x="8" y="20" width="16" height="2" fill="#FFFFFF" />
      
      {/* Pants (Dark slate) */}
      <rect x="12" y="19" width="8" height="2" fill="#1F2937" />
      
      {/* Shirt/Torso (Brick accent) */}
      <rect x="12" y="12" width="8" height="7" fill="#B46A4F" /> 
      
      {/* Head & Neck (Skin tone) */}
      <rect x="14" y="11" width="4" height="1" fill="#F5D0A9" />
      <rect x="12" y="5" width="8" height="6" fill="#F5D0A9" /> 
      
      {/* Hair (Brown) */}
      <rect x="11" y="4" width="10" height="2" fill="#4A3B32" />
      <rect x="11" y="6" width="2" height="3" fill="#4A3B32" />
      <rect x="19" y="6" width="2" height="3" fill="#4A3B32" />
      
      {/* Face features */}
      <rect x="14" y="7" width="1" height="1" fill="#000000" /> {/* Eye */}
      <rect x="17" y="7" width="1" height="1" fill="#000000" /> {/* Eye */}
      <rect x="15" y="9" width="2" height="1" fill="#E28B6E" /> {/* Mouth */}
      
      {/* Laptop (Warm Gray) */}
      <rect x="20" y="18" width="6" height="2" fill="#8A847A" /> {/* Base */}
      <rect x="23" y="13" width="1" height="5" fill="#8A847A" /> {/* Lid */}
      <rect x="22" y="14" width="1" height="4" fill="#AFCBEA" opacity="0.8" /> {/* Screen light */}
      
      {/* Hands (Skin tone) */}
      <rect x="18" y="16" width="3" height="1" fill="#F5D0A9" />
      
      {/* Laptop Light Beam (translucent soft blue) */}
      <polygon points="22,14 17,11 17,21 22,18" fill="rgba(175, 203, 234, 0.2)" />
    </svg>
  );
}

export default function Hero() {
  const { mode } = useColorMode();

  const handleScrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        background: mode === "light" 
          ? "linear-gradient(to bottom, #AFCBEA 0%, #F6F4EE 100%)"
          : "linear-gradient(to bottom, #0F141C 0%, #1B2230 100%)",
        pt: { xs: 10, md: 16 },
        pb: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3, md: 0 },
      }}
    >
      {/* Floating clouds in background */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        {/* Cloud 1 */}
        <Box
          className="pixel-cloud"
          sx={{
            position: "absolute",
            top: "15%",
            color: "rgba(255, 255, 255, 0.75)",
            animation: "floatSlow 40s linear infinite",
          }}
        >
          <PixelCloud1 />
        </Box>
        {/* Cloud 2 */}
        <Box
          className="pixel-cloud"
          sx={{
            position: "absolute",
            top: "40%",
            color: "rgba(255, 255, 255, 0.6)",
            animation: "floatMedium 55s linear infinite",
          }}
        >
          <PixelCloud2 />
        </Box>
        {/* Cloud 3 */}
        <Box
          className="pixel-cloud"
          sx={{
            position: "absolute",
            top: "60%",
            color: "rgba(255, 255, 255, 0.45)",
            animation: "floatFast 30s linear infinite",
          }}
        >
          <PixelCloud1 />
        </Box>
      </Box>

      {/* Dark mode stars */}
      {mode === "dark" && (
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 1 }}>
          <Box sx={{ position: "absolute", top: "12%", left: "15%", width: 4, height: 4, bgcolor: "#fff", animation: "twinkle 2s infinite steps(2)" }} />
          <Box sx={{ position: "absolute", top: "20%", left: "80%", width: 6, height: 6, bgcolor: "#fff", animation: "twinkle 3s infinite steps(3)" }} />
          <Box sx={{ position: "absolute", top: "35%", left: "48%", width: 4, height: 4, bgcolor: "#fff", animation: "twinkle 2.5s infinite steps(2)" }} />
          <Box sx={{ position: "absolute", top: "55%", left: "70%", width: 5, height: 5, bgcolor: "#fff", animation: "twinkle 4s infinite steps(4)" }} />
          <Box sx={{ position: "absolute", top: "75%", left: "25%", width: 4, height: 4, bgcolor: "#fff", animation: "twinkle 3.2s infinite steps(3)" }} />
        </Box>
      )}

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={{ xs: 3, sm: 5 }} alignItems="center">
          {/* Animated Pixel Character Sitting on Cloud */}
          <Box 
            sx={{ 
              animation: "hoverCloud 4s ease-in-out infinite",
              mb: { xs: -1, sm: -2 },
              '& svg': {
                width: { xs: 100, sm: 120, md: 140 },
                height: { xs: 100, sm: 120, md: 140 },
              }
            }}
          >
            <PixelCharacter />
          </Box>

          <Stack spacing={{ xs: 1.5, sm: 2.5 }} alignItems="center">
            {/* Small Pixel badge */}
            <Typography
              className="pixel-font"
              variant="subtitle2"
              sx={(t) => ({
                color: t.palette.mode === "light" ? "text.primary" : "info.main",
                border: "1px solid currentColor",
                px: 1.5,
                py: 0.5,
                fontSize: { xs: "0.7rem", sm: "0.85rem" },
              })}
            >
              AHMEDABAD, IN
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                fontSize: {
                  xs: "2rem",
                  sm: "3rem",
                  md: "4.5rem",
                },
                letterSpacing: "-1px",
                wordBreak: "break-word",
              }}
            >
              DARSHAN GOHEL
            </Typography>

            <Typography
              className="pixel-font"
              variant="h5"
              sx={(t) => ({
                fontWeight: 700,
                color: t.palette.mode === "light" ? "primary.main" : "secondary.main",
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.6rem" },
              })}
            >
              Software Developer
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ 
                maxWidth: "50ch", 
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.15rem" },
                lineHeight: 1.6,
                fontWeight: 500,
                px: { xs: 1, sm: 0 },
              }}
            >
              Building apps, products, and experiences one pixel at a time.
            </Typography>
          </Stack>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 3 }}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", pt: 1 }}
          >
            <Button
              onClick={() => handleScrollTo("#projects")}
              className="pixel-btn pixel-btn-primary"
              sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: 280, sm: 'none' } }}
            >
              View Projects
            </Button>

            <Button
              onClick={() => handleScrollTo("#contact")}
              className="pixel-btn"
              sx={{ width: { xs: '100%', sm: 'auto' }, maxWidth: { xs: 280, sm: 'none' } }}
            >
              Contact Me
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* Down arrow indicator */}
      <Box
        onClick={() => handleScrollTo("#about")}
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: { xs: 16, md: 24 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
          cursor: "pointer",
          animation: "bounce 2s infinite",
          zIndex: 2,
        }}
      >
        <KeyboardArrowDownIcon fontSize="large" />
      </Box>

      {/* Hero Specific CSS animations */}
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateX(110vw); }
          100% { transform: translateX(-150px); }
        }
        @keyframes floatMedium {
          0% { transform: translateX(110vw); }
          100% { transform: translateX(-200px); }
        }
        @keyframes floatFast {
          0% { transform: translateX(110vw); }
          100% { transform: translateX(-150px); }
        }
        @keyframes hoverCloud {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }
      `}</style>
    </Box>
  );
}
