import { Box, Container, Stack, Typography, IconButton, Tooltip, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import footer from '../../data/footer.json'

type FooterData = {
  name: string
  year?: number
  socials?: { platform: string; url: string }[]
  email?: string
  signoff?: string
}

const data = footer as FooterData

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const displayYear = data.year && data.year !== currentYear ? `${data.year}–${currentYear}` : currentYear

  return (
    <Box component="footer" sx={{ mt: { xs: 6, md: 8 }, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Stack direction="row" spacing={2} justifyContent="center">
            {data.socials?.map((s) => (
              <Tooltip key={s.platform} title={s.platform} arrow>
                <IconButton component="a" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                  {s.platform.toLowerCase().includes('github') ? (
                    <GitHubIcon sx={{fontSize:36}}/>
                  ) : s.platform.toLowerCase().includes('linkedin') ? (
                    <LinkedInIcon sx={{fontSize:36}}/>
                  ) : s.platform.toLowerCase().includes('twitter') || s.platform.toLowerCase().includes('x') ? (
                    <TwitterIcon sx={{fontSize:36}}/>
                  ) : (
                    <GitHubIcon />
                  )}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
          {data.email && (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <AlternateEmailIcon color="action" />
              <Link href={`mailto:${data.email}`} underline="hover" fontWeight={600}>
                {data.email}
              </Link>
            </Stack>
          )}
          {data.signoff && (
            <Typography variant="body1" color="text.secondary">
              {data.signoff}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            © {displayYear} {data.name}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
