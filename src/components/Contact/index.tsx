import { Box, Container, Stack, Typography, Alert, Link, IconButton, Tooltip } from '@mui/material'
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import contact from '../../data/contact.json'
import footer from '../../data/footer.json'
import { shouldReduceMotion } from '../../utils/motion'

// Icons
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import DownloadIcon from '@mui/icons-material/Download'

gsap.registerPlugin(ScrollTrigger)

type ContactData = {
  heading: string
  friendlyMessage: string
}

type FooterInfo = {
  email?: string
  socials?: { platform: string; url: string }[]
}

const data = contact as ContactData
const footerInfo = footer as FooterInfo

export default function Contact() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const reduce = shouldReduceMotion()
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-reveal', 
        { autoAlpha: 0, y: 24 }, 
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power2.out',
          scrollTrigger: { trigger: '.contact-reveal', start: 'top 85%', once: true } 
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      formData.set('form-name', 'contact')
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })
      
      if (response.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Box 
      id="contact" 
      ref={rootRef} 
      component="section" 
      aria-labelledby="contact-heading" 
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} className="contact-reveal">
          
          {/* Header */}
          <Stack spacing={1.5} alignItems="center" textAlign="center">
            <Typography 
              className="pixel-font"
              id="contact-heading" 
              variant="overline" 
              sx={{ color: "primary.main", fontWeight: 700, letterSpacing: "1.5px" }}
            >
              [ Get In Touch ]
            </Typography>
            <Typography variant="h3" fontWeight={800} sx={{ fontSize: { xs: "2rem", md: "2.75rem" } }}>
              Let’s Connect
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "60ch", fontSize: "1.05rem" }}>
              {data.friendlyMessage}
            </Typography>
          </Stack>

          {/* Form Alerts */}
          <Box aria-live="polite">
            {status === 'success' && (
              <Alert 
                severity="success" 
                onClose={() => setStatus('idle')} 
                role="status" 
                className="pixel-border" 
                sx={{ bgcolor: 'background.paper', borderRadius: 0 }}
              >
                Submission received! I'll get back to you shortly.
              </Alert>
            )}
            {status === 'error' && (
              <Alert 
                severity="error" 
                onClose={() => setStatus('idle')} 
                role="alert" 
                className="pixel-border"
                sx={{ bgcolor: 'background.paper', borderRadius: 0 }}
              >
                Something went wrong. Feel free to email me directly at {footerInfo.email || 'darshangohel32@gmail.com'}.
              </Alert>
            )}
          </Box>

          {/* Terminal Form Emulator */}
          <Box
            sx={(theme) => ({
              bgcolor: '#121214',
              color: '#FFF',
              border: `3px solid ${theme.palette.text.primary}`,
              boxShadow: `6px 6px 0px 0px ${theme.palette.text.primary}`,
              borderRadius: 0,
              overflow: 'hidden',
            })}
          >
            {/* Terminal Header */}
            <Box
              sx={{
                bgcolor: '#1C1C1E',
                px: 2,
                py: 1,
                borderBottom: '2px solid #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Stack direction="row" spacing={1}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF5F56' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27C93F' }} />
              </Stack>
              <Typography 
                className="terminal-font" 
                sx={{ fontSize: '1rem', color: '#8E8E93', letterSpacing: '1px' }}
              >
                darshan@portfolio: ~
              </Typography>
              <Box sx={{ width: 48 }} /> {/* spacer */}
            </Box>

            {/* Terminal Body */}
            <Box 
              component="form"
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              sx={{ p: 3 }}
            >
              {/* Netlify fields */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="text" name="bot-field" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />

              <Stack spacing={3}>
                
                {/* Introduction */}
                <Box>
                  <Typography 
                    className="terminal-font" 
                    sx={{ color: '#00FF6A', fontSize: '1.25rem', lineHeight: 1.3 }}
                  >
                    darshan@portfolio:~$ cat info.txt
                  </Typography>
                  <Typography 
                    className="terminal-font" 
                    sx={{ color: '#FFF', fontSize: '1.2rem', mt: 0.5, opacity: 0.9, lineHeight: 1.3 }}
                  >
                    Ready to build something together? Send a message through the command-line below.
                  </Typography>
                </Box>

                {/* Name field */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
                  <Typography 
                    className="terminal-font" 
                    sx={{ color: '#00FF6A', fontSize: '1.25rem' }}
                  >
                    visitor@portfolio:~$ name --input
                  </Typography>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="off"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1.5px dashed #444',
                      outline: 'none',
                      color: '#FFF',
                      fontFamily: "'VT323', monospace",
                      fontSize: '1.25rem',
                      flexGrow: 1,
                      padding: '2px 4px',
                    }}
                  />
                </Box>

                {/* Email field */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
                  <Typography 
                    className="terminal-font" 
                    sx={{ color: '#00FF6A', fontSize: '1.25rem' }}
                  >
                    visitor@portfolio:~$ email --input
                  </Typography>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1.5px dashed #444',
                      outline: 'none',
                      color: '#FFF',
                      fontFamily: "'VT323', monospace",
                      fontSize: '1.25rem',
                      flexGrow: 1,
                      padding: '2px 4px',
                    }}
                  />
                </Box>

                {/* Message field */}
                <Stack spacing={1}>
                  <Typography 
                    className="terminal-font" 
                    sx={{ color: '#00FF6A', fontSize: '1.25rem' }}
                  >
                    visitor@portfolio:~$ message --write
                  </Typography>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1.5px dashed #444',
                      outline: 'none',
                      color: '#FFF',
                      fontFamily: "'VT323', monospace",
                      fontSize: '1.25rem',
                      padding: '10px',
                      resize: 'none',
                    }}
                  />
                </Stack>

                {/* Buttons and Social Listing */}
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  justifyContent="space-between" 
                  alignItems={{ xs: 'flex-start', sm: 'center' }} 
                  spacing={3}
                  sx={{ pt: 2, borderTop: '1.5px solid #222' }}
                >
                  {/* CLI socials command output */}
                  <Box>
                    <Typography 
                      className="terminal-font" 
                      sx={{ color: '#00FF6A', fontSize: '1.25rem' }}
                    >
                      visitor@portfolio:~$ cat links.txt
                    </Typography>
                    <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
                      {footerInfo.socials?.map((s) => (
                        <Tooltip key={s.platform} title={s.platform} arrow>
                          <IconButton
                            component="a"
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: '#FFF', border: '1px solid #333', borderRadius: 0, p: 0.75, '&:hover': { bgcolor: '#222', borderColor: '#00FF6A' } }}
                          >
                            {s.platform.toLowerCase().includes('github') ? (
                              <GitHubIcon fontSize="small" />
                            ) : (
                              <LinkedInIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Tooltip>
                      ))}
                      {footerInfo.email && (
                        <Tooltip title="Copy Email" arrow>
                          <IconButton
                            onClick={() => navigator.clipboard.writeText(footerInfo.email || '')}
                            sx={{ color: '#FFF', border: '1px solid #333', borderRadius: 0, p: 0.75, '&:hover': { bgcolor: '#222', borderColor: '#00FF6A' } }}
                          >
                            <AlternateEmailIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Download Resume" arrow>
                        <IconButton
                          component="a"
                          href="https://drive.google.com/file/d/1dbe2aC0YBwcV17Hlkggqw-tW5LrsYXl-/view?usp=sharing"
                          target="_blank"
                          sx={{ color: '#FFF', border: '1px solid #333', borderRadius: 0, p: 0.75, '&:hover': { bgcolor: '#222', borderColor: '#00FF6A' } }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>

                  {/* Submit command */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      background: '#00FF6A',
                      color: '#121214',
                      border: 'none',
                      padding: '10px 24px',
                      fontFamily: "'VT323', monospace",
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '4px 4px 0px #FFF',
                      transition: 'transform 0.1s, box-shadow 0.1s',
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'translate(2px, 2px)'
                      e.currentTarget.style.boxShadow = '2px 2px 0px #FFF'
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'none'
                      e.currentTarget.style.boxShadow = '4px 4px 0px #FFF'
                    }}
                  >
                    {status === 'loading' ? 'SENDING...' : './submit_message.sh'}
                  </button>
                </Stack>
                
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
