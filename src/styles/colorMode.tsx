import { CssBaseline, IconButton, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import { useMemo, useState, createContext, useContext, PropsWithChildren } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

interface ColorModeContextValue {
  mode: 'light' | 'dark'
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined)

export function useColorMode() {
  const ctx = useContext(ColorModeContext)
  if (!ctx) throw new Error('useColorMode must be used within ColorModeProvider')
  return ctx
}

export function ColorModeProvider({ children }: PropsWithChildren) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDark ? 'dark' : 'light')

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev: 'light' | 'dark') => (prev === 'light' ? 'dark' : 'light')),
    }),
    [mode]
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === 'light' ? '#1976d2' : '#90caf9' },
          secondary: { main: '#9c27b0' },
        },
        typography: {
          fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        },
        shape: { borderRadius: 10 },
        components: {
          MuiButton: { defaultProps: { disableElevation: true } },
          MuiPaper: { defaultProps: { variant: 'outlined' } },
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggleColorModeButton />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

function ToggleColorModeButton() {
  const { mode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit"
      sx={{ position: 'fixed', bottom: 16, right: 16, bgcolor: 'background.paper', boxShadow: 3 }}
      aria-label="toggle color mode"
    >
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
