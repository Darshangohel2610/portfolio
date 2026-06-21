import {
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  GlobalStyles,
} from "@mui/material";
import {
  useMemo,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import { alpha } from "@mui/material/styles";

interface ColorModeContextValue {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(
  undefined
);

export function useColorMode() {
  const ctx = useContext(ColorModeContext);
  if (!ctx)
    throw new Error("useColorMode must be used within ColorModeProvider");
  return ctx;
}

export function ColorModeProvider({ children }: PropsWithChildren) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark">(
     "dark"
  );

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev: "light" | "dark") =>
          prev === "light" ? "dark" : "light"
        ),
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#B46A4F" : "#E28B6E", // Brick accent
          },
          secondary: {
            main: mode === "light" ? "#7A9B7D" : "#A2C3A5", // Sage green
          },
          info: {
            main: mode === "light" ? "#5B8CBE" : "#AFCBEA", // Sky blue
          },
          background: {
            default: mode === "light" ? "#F6F4EE" : "#1B2230", // Warm off-white vs Dusk indigo
            paper: mode === "light" ? "#FFFFFF" : "#242D3E", // White vs Slate paper
          },
          text: {
            primary: mode === "light" ? "#1F2937" : "#F4F5F6", // Charcoal vs Soft white
            secondary: mode === "light" ? "#555B6E" : "#9EB0C6", // Gray vs Soft blue-gray
          },
        },
        typography: {
          fontFamily: [
            "Inter",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif",
          ].join(","),
        },
        shape: { borderRadius: 4 }, // Sharp, modern, boxy layout
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                borderRadius: 4,
              },
            },
          },
          MuiPaper: { defaultProps: { variant: "outlined" } },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={(t) => ({
            html: { scrollBehavior: "smooth" },
            body: {
              scrollbarGutter: "stable",
              backgroundColor: t.palette.background.default,
              color: t.palette.text.primary,
              cursor: "auto",
            },
            ".about-reveal, .exp-item, .project-card, .skill-card, .testimonial-card, .contact-reveal, .contact-col, .pixel-cloud": {
              willChange: "transform, opacity",
            },
            ".pixel-font": {
              fontFamily: "'Pixelify Sans', cursive !important",
            },
            ".terminal-font": {
              fontFamily: "'VT323', monospace !important",
            },
            ".pixel-border": {
              border: `2px solid ${t.palette.text.primary} !important`,
              borderRadius: "0px !important",
              boxShadow: `3px 3px 0px 0px ${t.palette.text.primary}`,
            },
            ".pixel-card": {
              border: `2px solid ${t.palette.text.primary} !important`,
              borderRadius: "0px !important",
              boxShadow: `4px 4px 0px 0px ${
                t.palette.mode === "light" ? "#8A847A" : "#121722"
              }`,
              backgroundColor: t.palette.background.paper,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translate(-2px, -2px)",
                boxShadow: `6px 6px 0px 0px ${
                  t.palette.mode === "light" ? "#8A847A" : "#121722"
                }`,
              },
            },
            ".pixel-btn": {
              fontFamily: "'Pixelify Sans', cursive !important",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.5px",
              padding: "8px 24px",
              textTransform: "none",
              border: `2px solid ${t.palette.text.primary} !important`,
              borderRadius: "0px !important",
              boxShadow: `4px 4px 0px 0px ${t.palette.text.primary}`,
              backgroundColor: `${t.palette.background.paper} !important`,
              color: `${t.palette.text.primary} !important`,
              transition: "transform 0.1s, box-shadow 0.1s",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                transform: "translate(-2px, -2px)",
                boxShadow: `6px 6px 0px 0px ${t.palette.text.primary}`,
                backgroundColor: `${
                  t.palette.mode === "light" ? "#AFCBEA" : "#242D3E"
                } !important`,
              },
              "&:active": {
                transform: "translate(2px, 2px)",
                boxShadow: "0px 0px 0px 0px currentColor",
              },
              "&.Mui-disabled": {
                opacity: 0.6,
                transform: "none",
                boxShadow: "none",
              },
            },
            ".pixel-btn-primary": {
              backgroundColor: `${t.palette.primary.main} !important`,
              color: `${
                t.palette.mode === "light" ? "#FFFFFF" : "#1F2937"
              } !important`,
              "&:hover": {
                backgroundColor: `${
                  t.palette.mode === "light" ? "#B46A4F" : "#E28B6E"
                } !important`,
                opacity: 0.95,
              },
            },
            /* Firefox */
            "*, *::before, *::after": {
              scrollbarWidth: "thin",
              scrollbarColor: `${t.palette.primary.main} ${
                t.palette.mode === "dark" ? "#2a2a2a" : "#e9e9e9"
              }`,
            },
            /* WebKit */
            "::-webkit-scrollbar": {
              width: 8,
              height: 8,
            },
            "::-webkit-scrollbar-track": {
              backgroundColor:
                t.palette.mode === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: t.palette.primary.main,
              border: `1px solid ${
                t.palette.mode === "dark" ? "#1B2230" : "#F6F4EE"
              }`,
            },
            "::-webkit-scrollbar-thumb:hover": {
              backgroundColor: t.palette.primary.dark,
            },
            "::-webkit-scrollbar-button": {
              display: "none",
            },
            "::-webkit-scrollbar-corner": { backgroundColor: "transparent" },
          })}
        />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
