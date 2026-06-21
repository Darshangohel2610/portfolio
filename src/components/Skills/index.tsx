import { Box, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldReduceMotion } from "../../utils/motion";

// Icons
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { SiMui, SiPython, SiPostman, SiJavascript, SiHtml5, SiCss3 } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { FaGitlab, FaGitAlt } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiRedux } from "react-icons/si";
import { SiTypescript } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS", "Python"],
    color: "#AFCBEA" // Sky blue glow
  },
  {
    title: "Frontend",
    skills: ["React", "React Native", "Next.js", "Redux Toolkit", "Zustand", "Tailwind CSS", "Material UI"],
    color: "#7A9B7D" // Sage green glow
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"],
    color: "#B46A4F" // Brick glow
  },
  {
    title: "DevTools & Platforms",
    skills: ["Git", "GitHub", "GitLab", "Postman", "Apidog", "Reactotron"],
    color: "#E28B6E" // Soft orange glow
  }
];

function getSkillIcon(skill: string) {
  const s = skill.toLowerCase();
  if (s === 'javascript') return <SiJavascript />;
  if (s === 'typescript') return <SiTypescript />;
  if (s === 'html') return <SiHtml5 />;
  if (s === 'css') return <SiCss3 />;
  if (s === 'python') return <SiPython />;
  if (s === 'react' || s === 'react native') return <FaReact />;
  if (s === 'next.js') return <RiNextjsFill />;
  if (s === 'redux toolkit') return <SiRedux />;
  if (s === 'tailwind css') return <RiTailwindCssFill />;
  if (s === 'material ui') return <SiMui />;
  if (s === 'node.js' || s === 'express.js') return <IoLogoNodejs />;
  if (s === 'git' || s === 'github') return <FaGitAlt />;
  if (s === 'gitlab') return <FaGitlab />;
  if (s === 'postman') return <SiPostman />;
  return <CodeRoundedIcon fontSize="small" />;
}

export default function Skills() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = shouldReduceMotion();
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.skill-card');
      cards.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 20 };
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: i * 0.06,
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            };
        gsap.fromTo(el, from, to as any);
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box 
      id="skills" 
      ref={rootRef} 
      component="section" 
      aria-labelledby="skills-heading" 
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6 }} alignItems="center" textAlign="center">
          <Typography 
            className="pixel-font"
            id="skills-heading" 
            variant="overline" 
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "1.5px" }}
          >
            [ Toolkit & Proficiencies ]
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
            Technical Skills
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {categories.map((cat, idx) => (
            <Grid key={cat.title} item xs={12} sm={6} md={4}>
              <Paper
                className="skill-card pixel-card"
                sx={(theme) => ({
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  outline: "none",
                  "&:hover, &:focus-visible": {
                    transform: "translate(-4px, -4px)",
                    boxShadow: `6px 6px 0px 0px ${theme.palette.text.primary}, 0px 0px 15px ${cat.color}`,
                    borderColor: `${cat.color} !important`,
                  }
                })}
              >
                {/* Card Title */}
                <Typography
                  className="pixel-font"
                  variant="h5"
                  fontWeight={700}
                  sx={{ 
                    mb: 2, 
                    pb: 1, 
                    borderBottom: "2px solid", 
                    borderColor: "text.primary",
                    color: "primary.main",
                  }}
                >
                  {cat.title}
                </Typography>

                {/* Skills list */}
                <Stack direction="row" flexWrap="wrap" gap={1.25} sx={{ mt: 1 }}>
                  {cat.skills.map((skill) => (
                    <Chip
                      key={skill}
                      icon={getSkillIcon(skill)}
                      label={skill}
                      size="small"
                      sx={(theme) => ({
                        borderRadius: 0,
                        border: `1.5px solid ${theme.palette.text.primary}`,
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        bgcolor: "background.default",
                        px: 0.5,
                        py: 1.5,
                        "& .MuiChip-icon": {
                          color: "text.primary",
                          fontSize: "1rem",
                          ml: 0.5,
                        }
                      })}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
