import { Box, Chip, Container, Paper, Stack, Typography } from '@mui/material'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import experience from '../../../data/experience.json'
import { shouldReduceMotion } from '../../../utils/motion'

gsap.registerPlugin(ScrollTrigger)

type ExperienceItem = {
  company: string
  role: string
  period: string
  summary: string
  technologies?: string[]
}

const items = experience as ExperienceItem[]

export default function Experience() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const reduce = shouldReduceMotion()
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.exp-item')
      elements.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 24 }
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: i * 0.08,
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            }
        gsap.fromTo(el, from, to as any)
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box 
      id="experience" 
      ref={rootRef} 
      component="section" 
      aria-labelledby="experience-heading" 
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6 }} alignItems="center" textAlign="center">
          <Typography 
            className="pixel-font"
            id="experience-heading" 
            variant="overline" 
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "1.5px" }}
          >
            [ Professional Journey ]
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
            Work Experience
          </Typography>
        </Stack>

        <Stack spacing={4}>
          {items.map((item, idx) => (
            <Paper
              key={`${item.company}-${idx}`}
              className="exp-item pixel-card"
              tabIndex={0}
              sx={{
                p: { xs: 3, md: 4 },
                outline: 'none',
              }}
            >
              <Stack spacing={2}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={1}
                >
                  <Typography variant="h5" fontWeight={700}>
                    {item.role} · <span style={{ color: '#B46A4F' }}>{item.company}</span>
                  </Typography>
                  <Typography 
                    className="pixel-font" 
                    variant="subtitle2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                  >
                    {item.period}
                  </Typography>
                </Stack>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ lineHeight: 1.6, fontWeight: 500 }}
                >
                  {item.summary}
                </Typography>

                {item.technologies && item.technologies.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={1.25} sx={{ pt: 1 }}>
                    {item.technologies.map((tech) => (
                      <Chip 
                        key={tech} 
                        label={tech} 
                        size="small" 
                        className="pixel-font"
                        sx={(theme) => ({
                          borderRadius: 0,
                          border: `1.5px solid ${theme.palette.text.primary}`,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          bgcolor: 'transparent',
                          px: 0.5,
                          py: 1.25,
                        })}
                      />
                    ))}
                  </Stack>
                )}
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
