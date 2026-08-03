import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import about from "../../data/about.json";
import { shouldReduceMotion } from "../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

type TimelineItem = { year: string; event: string };

type AboutData = {
  story: string;
  timeline?: TimelineItem[];
};

const data = about as AboutData;

function RooftopAesthetic() {
  return (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid meet"
      style={{
        imageRendering: "pixelated",
        opacity: 0.85,
        display: "block",
        maxWidth: "100%",
      }}
    >
      {/* Electrical poles */}
      <line x1="12" y1="10" x2="12" y2="60" stroke="#8A847A" strokeWidth="1" />
      <line x1="88" y1="15" x2="88" y2="60" stroke="#8A847A" strokeWidth="1" />

      {/* Cross beams */}
      <line
        x1="7"
        y1="18"
        x2="17"
        y2="18"
        stroke="#8A847A"
        strokeWidth="1.5"
      />
      <line
        x1="83"
        y1="23"
        x2="93"
        y2="23"
        stroke="#8A847A"
        strokeWidth="1.5"
      />

      {/* Wires */}
      <path
        d="M12 18 Q50 32, 88 23"
        fill="none"
        stroke="#8A847A"
        strokeWidth="0.75"
      />
      <path
        d="M12 21 Q50 35, 88 26"
        fill="none"
        stroke="#8A847A"
        strokeWidth="0.5"
        strokeDasharray="1,1"
      />

      {/* Bird on wire */}
      <rect x="45" y="25.5" width="3" height="2" fill="#1F2937" />
      <rect x="46" y="24.5" width="1" height="1" fill="#1F2937" />

      {/* Concrete ledge */}
      <rect x="0" y="48" width="100" height="12" fill="#B46A4F" />
      <rect x="0" y="46" width="100" height="2" fill="#8A847A" />

      {/* Soft Cloud */}
      <rect x="62" y="4" width="16" height="4" fill="#FFFFFF" opacity="0.9" />
      <rect x="65" y="2" width="10" height="2" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

export default function About() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = shouldReduceMotion();
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".about-reveal");
      elements.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 24 };
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: i * 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                once: true,
              },
            };
        gsap.fromTo(el, from, to as any);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="about"
      ref={rootRef}
      component="section"
      aria-labelledby="about-heading"
      sx={{ py: { xs: 6, md: 12 } }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 3 } }}>
        <Stack spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Header */}
          <Stack
            spacing={1.5}
            className="about-reveal"
            alignItems="center"
            textAlign="center"
            sx={{ width: "100%" }}
          >
            <Typography
              className="pixel-font"
              id="about-heading"
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "1.5px",
              }}
            >
              [ About Me ]
            </Typography>
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
              }}
            >
              A little bit of my story
            </Typography>
          </Stack>

          {/* Content: Story + Illustration — Flexbox for proper centering */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, md: 5 },
              alignItems: { xs: "center", md: "stretch" },
              width: "100%",
            }}
          >
            {/* Story Card */}
            <Box
              className="about-reveal"
              sx={{
                flex: { md: "1 1 58%" },
                width: "100%",
                maxWidth: { xs: "100%", md: "none" },
              }}
            >
              <Paper
                className="pixel-card"
                sx={{
                  p: { xs: 2.5, sm: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    lineHeight: 1.7,
                    fontWeight: 500,
                  }}
                >
                  {data.story}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  I enjoy working at the intersection of robust backend services
                  and smooth mobile frontends. Creating products that are clean,
                  readable, and highly functional is my core focus.
                </Typography>
              </Paper>
            </Box>

            {/* Illustration */}
            <Box
              className="about-reveal"
              sx={{
                flex: { md: "1 1 42%" },
                width: "100%",
                maxWidth: { xs: "100%", md: "none" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: (t) =>
                    t.palette.mode === "light"
                      ? "rgba(175,203,234,0.3)"
                      : "rgba(36,45,62,0.5)",
                  border: "2px solid",
                  borderColor: "text.primary",
                  boxShadow: (t) =>
                    `4px 4px 0px 0px ${t.palette.text.primary}`,
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <RooftopAesthetic />
              </Box>
            </Box>
          </Box>

          {/* Timeline Section */}
          {data.timeline && data.timeline.length > 0 && (
            <Box
              className="about-reveal"
              sx={{
                maxWidth: { xs: "100%", md: 720 },
                mx: "auto",
                width: "100%",
                pt: { xs: 2, md: 4 },
              }}
            >
              <Typography
                className="pixel-font"
                variant="h5"
                fontWeight={700}
                sx={{
                  mb: { xs: 3, md: 4 },
                  textAlign: "center",
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                }}
              >
                Journey Timeline
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  pl: { xs: 3, sm: 4 },
                  ml: { xs: 1, sm: 2, md: 0 },
                  borderLeft: "2px dashed",
                  borderColor: "text.primary",
                }}
              >
                {data.timeline.map((item, idx) => (
                  <Box
                    key={`${item.year}-${idx}`}
                    sx={{
                      position: "relative",
                      mb: { xs: 3, md: 4 },
                      "&:last-child": { mb: 0 },
                    }}
                  >
                    {/* Rotated Diamond Node */}
                    <Box
                      sx={(theme) => ({
                        position: "absolute",
                        left: { xs: -27, sm: -41 },
                        top: 2,
                        width: { xs: 14, sm: 16 },
                        height: { xs: 14, sm: 16 },
                        bgcolor: theme.palette.background.default,
                        border: `2px solid ${theme.palette.text.primary}`,
                        transform: "rotate(45deg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&::after": {
                          content: '""',
                          width: { xs: 5, sm: 6 },
                          height: { xs: 5, sm: 6 },
                          bgcolor: theme.palette.primary.main,
                        },
                      })}
                    />

                    <Box>
                      <Typography
                        className="pixel-font"
                        variant="subtitle2"
                        color="primary.main"
                        fontWeight={700}
                        sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}
                      >
                        {item.year}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{
                          mt: 0.5,
                          fontSize: {
                            xs: "0.85rem",
                            sm: "0.95rem",
                            md: "1.05rem",
                          },
                        }}
                      >
                        {item.event}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
