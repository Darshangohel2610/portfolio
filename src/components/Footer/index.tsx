import { Box, Container, Stack, Typography } from '@mui/material'
import footer from '../../data/footer.json'

type FooterData = {
  name: string
  year?: number
}

const data = footer as FooterData

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const displayYear = data.year && data.year !== currentYear ? `${data.year}–${currentYear}` : currentYear

  return (
    <Box component="footer" sx={{ mt: { xs: 6, md: 8 }, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems="center" sx={{ py: 3 }}>
          <Typography variant="body2" color="text.secondary">
            © {displayYear} {data.name}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
