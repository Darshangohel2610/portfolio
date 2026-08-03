import { Box, Container, Stack, Typography, IconButton, Tooltip, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { SiDailydotdev } from "react-icons/si";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import { SiMui } from "react-icons/si";
import { SiNetlify } from "react-icons/si";
import footer from '../../data/footer.json'
import { FaReact } from "react-icons/fa";

type FooterData = {
  name: string
  year?: number
  socials?: { platform: string; url: string }[]
  email?: string
  signoff?: string
  tech?: { prefix: string; label: string; url: string; kind: string }[]
}

const data = footer as FooterData

function techIcon(kind: string) {
  const k = kind.toLowerCase()
  if (k.includes('react')) return <FaReact fontSize="small" />
  if (k.includes('mui')) return <SiMui fontSize="small" />
  if (k.includes('netlify')) return <SiNetlify fontSize="small" />
  return <ChangeHistoryIcon fontSize="small" />
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const displayYear = data.year && data.year !== currentYear ? `${data.year}–${currentYear}` : currentYear

  return (
    <Box component="footer" sx={{ mt: { xs: 4, md: 8 }, borderTop: 1, borderColor: 'divider', px: { xs: 2, sm: 3, md: 0 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={{ xs: 2, md: 3 }} alignItems="center" textAlign="center">
          <Stack direction="row" spacing={{ xs: 1.5, md: 2 }} justifyContent="center" flexWrap="wrap">
            {data.socials?.map((s) => (
              <Tooltip key={s.platform} title={s.platform} arrow>
                <IconButton component="a" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                  {s.platform.toLowerCase().includes('github') ? (
                    <GitHubIcon sx={{ fontSize: { xs: 28, md: 36 } }}/>
                  ) : s.platform.toLowerCase().includes('linkedin') ? (
                    <LinkedInIcon sx={{ fontSize: { xs: 28, md: 36 } }}/>
                  ) : s.platform.toLowerCase().includes('daily dev') || s.platform.toLowerCase().includes('x') ? (
                    <SiDailydotdev style={{ fontSize: 28 }}/>
                  ) : (
                    <GitHubIcon />
                  )}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
          {data.email && (
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" justifyContent="center">
              <AlternateEmailIcon color="action" sx={{ fontSize: { xs: 18, md: 24 } }} />
              <Link 
                href={`https://mail.google.com/mail/u/0/?fs=1&to=${data.email}&su=Hey+Darshan!&tf=cm`} 
                underline="hover" 
                fontWeight={600}
                sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, wordBreak: 'break-all' }}
              >
                {data.email}
              </Link>
            </Stack>
          )}
          {data.signoff && (
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' }, px: { xs: 1, sm: 0 } }}>
              {data.signoff}
            </Typography>
          )}
          {data.tech && data.tech.length > 0 && (
            <Stack direction="row" spacing={{ xs: 1, md: 2 }} flexWrap="wrap" justifyContent="center" rowGap={1}>
              {data.tech.map((t) => (
                <Stack key={t.label} direction="row" spacing={0.5} alignItems="center">
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    {t.prefix}
                  </Typography>
                  <Link href={t.url} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                    {techIcon(t.kind)}
                    <Typography variant="caption" fontWeight={700} sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>{t.label}</Typography>
                  </Link>
                </Stack>
              ))}
            </Stack>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            © {displayYear} {data.name}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
