import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import testimonials from "../../../data/testimonials.json";
import { shouldReduceMotion } from "../../../utils/motion";
import PixelTransition from "@/components/animated_components/components/PixelTransition";
import { useColorMode } from "@/styles/colorMode";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  name: string;
  quote: string;
  role?: string;
};

const items = testimonials as Testimonial[];

export default function Testimonials() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useColorMode();

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = shouldReduceMotion();
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");
      cards.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 20 };
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
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
      ref={rootRef}
      component="section"
      aria-labelledby="testimonials-heading"
      sx={{ py: { xs: 6, md: 8 } }}
    >
      <Container maxWidth="md">
        <Stack spacing={1.5} sx={{ mb: 6 }} alignItems="center" textAlign="center">
          <Typography 
            className="pixel-font"
            id="testimonials-heading" 
            variant="overline" 
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "1.5px" }}
          >
            [ Kind Words ]
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
            Testimonials
          </Typography>
        </Stack>

        {items.length === 0 ? (
          <PixelTransition
            firstContent={
              <Typography
                variant="h1"
                fontWeight={700}
                color={`${mode !== "dark" ? "#222" : "#f5f5f5"}`}
                align="center"
              >
                “...”
              </Typography>
            }
            secondContent={
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: `${mode === "dark" ? "#222" : "#f5f5f5"}`,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color={`${mode !== "dark" ? "#222" : "#f5f5f5"}`}
                  align="center"
                  sx={{
                    px: 3,
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                    },
                  }}
                >
                  Testimonials coming soon. Yours could be the first — let’s make something rave-worthy.
                </Typography>
              </Box>
            }
            style={{
              backgroundColor: `${mode === "dark" ? "#222" : "#f5f5f5"}`,
              border: `2px solid ${mode === "dark" ? "#FFF" : "#1F2937"}`,
              minHeight: '200px',
            }}
            gridSize={12}
            pixelColor={mode === "dark" ? "#f5f5f5" : "#222"}
            animationStepDuration={0.4}
          />
        ) : (
          <Grid container spacing={3}>
            {items.map((t, idx) => (
              <Grid key={`${t.name}-${idx}`} item xs={12} sm={6}>
                <Card
                  className="testimonial-card pixel-card"
                  sx={{ height: "100%", p: 2, outline: "none" }}
                >
                  <CardContent>
                    <FormatQuoteRoundedIcon sx={{ color: "primary.main", fontSize: 32 }} />
                    <Typography variant="body1" sx={{ my: 1.5, lineHeight: 1.6, fontWeight: 500 }}>
                      “{t.quote}”
                    </Typography>
                    <Typography className="pixel-font" variant="subtitle2" fontWeight={700}>
                      {t.name}
                    </Typography>
                    {t.role && (
                      <Typography variant="caption" color="text.secondary">
                        {t.role}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
