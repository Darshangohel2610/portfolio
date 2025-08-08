import { Box, Container, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import contact from '../../data/contact.json'

gsap.registerPlugin(ScrollTrigger)

type Social = { platform: string; url: string }

type ContactData = {
  email: string
  socials: Social[]
  signoff: string
}

const data = contact as ContactData

function socialIcon(platform: string) {
  const p = platform.toLowerCase()
  if (p.includes('github')) return <GitHubIcon />
  if (p.includes('linkedin')) return <LinkedInIcon />
  if (p.includes('twitter') || p.includes('x')) return <TwitterIcon />
  return <AlternateEmailIcon />
}

export default function Contact() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
          },
        }
      )

      const icons = gsap.utils.toArray<HTMLElement>('.contact-icon')
      icons.forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.1 * i,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box id="contact" ref={rootRef} component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 2, md: 3 }} alignItems={{ xs: 'flex-start', md: 'center' }} textAlign={{ xs: 'left', md: 'center' }}>
          <Typography className="contact-reveal" variant="overline" color="text.secondary">
            Contact
          </Typography>
          <Typography className="contact-reveal" variant="h4" fontWeight={700} sx={{ maxWidth: 900 }}>
            {data.signoff}
          </Typography>

          <Stack direction="row" spacing={1.5} className="contact-reveal" alignItems="center" flexWrap="wrap">
            <AlternateEmailIcon color="action" />
            <Link href={`mailto:${data.email}`} underline="hover" fontWeight={600}>
              {data.email}
            </Link>
          </Stack>

          <Stack direction="row" spacing={1} className="contact-reveal" justifyContent={{ xs: 'flex-start', md: 'center' }}>
            {data.socials?.map((s) => (
              <Tooltip key={s.platform} title={s.platform} arrow>
                <IconButton
                  className="contact-icon"
                  component="a"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  size="large"
                  sx={{ border: 1, borderColor: 'divider' }}
                >
                  {socialIcon(s.platform)}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
