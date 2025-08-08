import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import testimonials from '../../../data/testimonials.json'
import { shouldReduceMotion } from '../../../utils/motion'

gsap.registerPlugin(ScrollTrigger)

type Testimonial = {
  name: string
  quote: string
  role?: string
}

const items = testimonials as Testimonial[]

export default function Testimonials() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const reduce = shouldReduceMotion()
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card')
      cards.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 20 }
        const to = reduce
          ? { autoAlpha: 1, y: 0, duration: 0 }
          : {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: i * 0.05,
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
            }
        gsap.fromTo(el, from, to as any)
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={rootRef} component="section" aria-labelledby="testimonials-heading" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography id="testimonials-heading" variant="h5" fontWeight={700}>
            Testimonials
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Want to write one? Reach out via Contact!
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {items.map((t, idx) => (
            <Grid key={`${t.name}-${idx}`} item xs={12} sm={6} md={4}>
              <Card className="testimonial-card" variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <FormatQuoteRoundedIcon color="disabled" />
                  <Typography variant="body1" sx={{ my: 1.25 }}>
                    “{t.quote}”
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={700}>{t.name}</Typography>
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
      </Container>
    </Box>
  )
}
