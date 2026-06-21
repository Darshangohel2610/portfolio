import { Box, Card, CardActions, CardContent, Container, Grid, Button, Typography, Stack } from '@mui/material'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projects from '../../../data/projects.json'
import { shouldReduceMotion } from '../../../utils/motion'
import footer from '../../../data/footer.json'

gsap.registerPlugin(ScrollTrigger)

type Project = {
  title: string
  description: string
  link: string
}

const items = projects as Project[]
const githubUrl = (() => {
  const f: any = footer as any
  const hit = f?.socials?.find((s: any) => String(s?.kind ?? s?.label ?? '').toLowerCase().includes('github'))
  return hit?.url || 'https://github.com/Darshangohel2610'
})()

function getProjectArt(title: string) {
  const t = title.toLowerCase()
  const svgStyle = { imageRendering: 'pixelated' as const, display: 'block', margin: '0 auto' }

  if (t.includes('habit')) {
    // Habit Calendar Check
    return (
      <svg width="48" height="48" viewBox="0 0 16 16" style={svgStyle}>
        <rect x="2" y="2" width="12" height="12" fill="#7A9B7D" />
        <rect x="4" y="0" width="2" height="3" fill="#1F2937" />
        <rect x="10" y="0" width="2" height="3" fill="#1F2937" />
        <rect x="5" y="8" width="2" height="2" fill="#FFFFFF" />
        <rect x="7" y="10" width="2" height="2" fill="#FFFFFF" />
        <rect x="9" y="6" width="2" height="2" fill="#FFFFFF" />
        <rect x="11" y="4" width="2" height="2" fill="#FFFFFF" />
      </svg>
    )
  }
  
  if (t.includes('mood') || t.includes('recommender')) {
    // Smiley face content recommender
    return (
      <svg width="48" height="48" viewBox="0 0 16 16" style={svgStyle}>
        <rect x="2" y="2" width="12" height="12" fill="#AFCBEA" />
        <rect x="4" y="5" width="2" height="2" fill="#1F2937" />
        <rect x="10" y="5" width="2" height="2" fill="#1F2937" />
        <rect x="4" y="9" width="8" height="2" fill="#1F2937" />
        <rect x="4" y="8" width="2" height="1" fill="#1F2937" />
        <rect x="10" y="8" width="2" height="1" fill="#1F2937" />
      </svg>
    )
  }
  
  if (t.includes('leela') || t.includes('film')) {
    // Clapperboard graphic
    return (
      <svg width="48" height="48" viewBox="0 0 16 16" style={svgStyle}>
        <rect x="2" y="2" width="12" height="12" fill="#1F2937" />
        <rect x="2" y="2" width="3" height="3" fill="#FFFFFF" />
        <rect x="7" y="2" width="2" height="3" fill="#FFFFFF" />
        <rect x="12" y="2" width="2" height="3" fill="#FFFFFF" />
        <rect x="2" y="5" width="12" height="1" fill="#FFFFFF" />
        <rect x="4" y="8" width="8" height="1" fill="#8A847A" />
        <rect x="4" y="10" width="6" height="1" fill="#8A847A" />
      </svg>
    )
  }
  
  if (t.includes('jewelry') || t.includes('e-commerce') || t.includes('shop')) {
    // Diamond graphic
    return (
      <svg width="48" height="48" viewBox="0 0 16 16" style={svgStyle}>
        <rect x="7" y="2" width="2" height="2" fill="#E28B6E" />
        <rect x="5" y="4" width="6" height="2" fill="#E28B6E" />
        <rect x="3" y="6" width="10" height="2" fill="#E28B6E" />
        <rect x="5" y="8" width="6" height="2" fill="#E28B6E" />
        <rect x="7" y="10" width="2" height="2" fill="#E28B6E" />
        <rect x="7" y="6" width="2" height="2" fill="#FFFFFF" />
      </svg>
    )
  }
  
  if (t.includes('garagewale') || t.includes('garage')) {
    // Spanners/Car
    return (
      <svg width="48" height="48" viewBox="0 0 16 16" style={svgStyle}>
        <rect x="1" y="2" width="14" height="12" fill="#7A9B7D" />
        <rect x="3" y="7" width="10" height="3" fill="#1F2937" />
        <rect x="5" y="5" width="6" height="3" fill="#1F2937" />
        <rect x="4" y="9" width="2" height="2" fill="#FFFFFF" />
        <rect x="10" y="9" width="2" height="2" fill="#FFFFFF" />
      </svg>
    )
  }
  
  if (t.includes('ticket') || t.includes('task') || t.includes('management')) {
    // Ticketing workspace
    return (
      <svg width="48" height="48" viewBox="0 0 16 16" style={svgStyle}>
        <rect x="2" y="2" width="12" height="12" fill="#8A847A" />
        <rect x="4" y="4" width="8" height="2" fill="#FFFFFF" />
        <rect x="4" y="7" width="8" height="2" fill="#FFFFFF" />
        <rect x="4" y="10" width="8" height="2" fill="#FFFFFF" />
        <rect x="5" y="5" width="2" height="1" fill="#7A9B7D" />
        <rect x="5" y="8" width="2" height="1" fill="#B46A4F" />
        <rect x="5" y="11" width="2" height="1" fill="#AFCBEA" />
      </svg>
    )
  }

  // Fallback (Heart)
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" style={svgStyle}>
      <rect x="2" y="2" width="12" height="12" fill="#FFFFFF" />
      <rect x="4" y="5" width="2" height="2" fill="#B46A4F" />
      <rect x="10" y="5" width="2" height="2" fill="#B46A4F" />
      <rect x="5" y="7" width="6" height="2" fill="#B46A4F" />
      <rect x="6" y="9" width="4" height="2" fill="#B46A4F" />
      <rect x="7" y="11" width="2" height="1" fill="#B46A4F" />
    </svg>
  )
}

export default function Projects() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const reduce = shouldReduceMotion()
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-card')
      cards.forEach((el, i) => {
        const from = { autoAlpha: 0, y: 20 }
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
      id="projects" 
      ref={rootRef} 
      component="section" 
      aria-labelledby="projects-heading" 
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6 }} alignItems="center" textAlign="center">
          <Typography 
            className="pixel-font"
            id="projects-heading" 
            variant="overline" 
            sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "1.5px" }}
          >
            [ Featured Work ]
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
            Recent Projects
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {items.map((p, idx) => (
            <Grid key={`${p.title}-${idx}`} item xs={12} sm={6} md={4}>
              <Card
                className="project-card pixel-card"
                tabIndex={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  outline: 'none',
                  p: 2,
                }}
              >
                {/* Pixel graphic header container */}
                <Box
                  sx={(theme) => ({
                    p: 2,
                    border: '1.5px solid',
                    borderColor: theme.palette.text.primary,
                    bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  })}
                >
                  {getProjectArt(p.title)}
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 1 }}>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 1, lineHeight: 1.3 }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                    {p.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ px: 1, pb: 1, pt: 2 }}>
                  {p.link ? (
                    <Button 
                      component="a" 
                      href={p.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="pixel-btn"
                      sx={{ width: '100%', py: 0.5, fontSize: '0.85rem' }}
                    >
                      Visit Project
                    </Button>
                  ) : (
                    <Button 
                      disabled
                      className="pixel-btn"
                      sx={{ width: '100%', py: 0.5, fontSize: '0.85rem' }}
                    >
                      Internal Project
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            className="pixel-btn pixel-btn-primary"
            component="a"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See more projects on GitHub"
          >
            See More on GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
