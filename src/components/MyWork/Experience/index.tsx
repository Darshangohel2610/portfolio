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
              delay: i * 0.05,
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            }
        gsap.fromTo(el, from, to as any)
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={rootRef} component="section" aria-labelledby="experience-heading" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Typography id="experience-heading" variant="h5" fontWeight={700}>
            Experience
          </Typography>
        </Stack>
        <Stack spacing={2.5}>
          {items.map((item, idx) => (
            <Paper key={`${item.company}-${idx}`} className="exp-item" variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={1.25}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1}>
                  <Typography variant="h6" fontWeight={700}>
                    {item.role} · {item.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.period}
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary">
                  {item.summary}
                </Typography>
                {item.technologies && item.technologies.length > 0 && (
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {item.technologies.map((tech) => (
                      <Chip key={tech} label={tech} size="small" variant="outlined" />
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
