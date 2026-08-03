import { AppBar, Box, Tab, Tabs, Toolbar } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const tabs = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Determine active tab by hash
  const activeIndex = useMemo(() => {
    if (typeof window === "undefined") return 0;
    const hash = window.location.hash;
    const i = tabs.findIndex((t) => t.href === hash);
    return i >= 0 ? i : 0;
  }, [typeof window !== "undefined" ? window.location.hash : ""]);

  useEffect(() => setValue(activeIndex), [activeIndex]);

  useEffect(() => {
    if (!barRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".navbar-container",
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
      );
    }, barRef);
    return () => ctx.revert();
  }, []);

  // Update active tab on manual scroll
  useEffect(() => {
    const getTop = (hash: string) => {
      if (hash === "#top") return 0;
      const el = document.querySelector(hash) as HTMLElement | null;
      if (!el) return Number.POSITIVE_INFINITY;
      return el.getBoundingClientRect().top + window.scrollY;
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      if (isManualScrolling) return; // skip while smooth scroll in progress

      const threshold = window.innerHeight * 0.4;
      const y = window.scrollY + threshold;

      // Find the active section based on scroll position
      let activeIdx = 0;
      for (let i = tabs.length - 1; i >= 0; i--) {
        const topVal = getTop(tabs[i].href);
        if (y >= topVal) {
          activeIdx = i;
          break;
        }
      }

      setValue((prev) => {
        if (prev !== activeIdx) {
          const href = tabs[activeIdx].href;
          try {
            history.replaceState(null, "", href);
          } catch {}
        }
        return activeIdx;
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // initialize
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isManualScrolling]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const href = tabs[newValue].href;
    const el = document.querySelector(href === "#top" ? "body" : href);

    // disable scroll listener temporarily
    setIsManualScrolling(true);
    if (el) el.scrollIntoView();
    history.replaceState(null, "", href);

    // re-enable after smooth scroll duration (~800ms)
    setTimeout(() => setIsManualScrolling(false), 800);
  };

  return (
    <AppBar
      ref={barRef}
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        top: { xs: 8, md: 16 },
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        border: "none",
        zIndex: (t) => t.zIndex.appBar + 1,
        px: { xs: 1, sm: 2, md: 0 },
      }}
    >
      <Toolbar
        disableGutters
        sx={{ width: "100%", justifyContent: "center" }}
        className="navbar-container"
      >
        <Box
          sx={(theme) => ({
            pointerEvents: "auto",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(27,34,48,0.75)"
                : "rgba(246,244,238,0.75)",
            backdropFilter: "blur(8px)",
            borderRadius: 0,
            border: "2px solid",
            borderColor: theme.palette.text.primary,
            px: { xs: 0.5, sm: 1.5 },
            py: 0.5,
            boxShadow: `3px 3px 0px 0px ${theme.palette.text.primary}`,
            maxWidth: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            /* Hide scrollbar for all browsers */
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          })}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            textColor="inherit"
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              minHeight: "unset",
              "& .MuiTabs-flexContainer": {
                gap: { xs: 0, sm: 1 },
              },
              "& .MuiTabs-scroller": {
                overflowX: "auto !important",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              },
              "& .MuiTab-root": {
                fontFamily: "'Pixelify Sans', cursive",
                fontWeight: 600,
                fontSize: { xs: "0.7rem", sm: "0.9rem" },
                minHeight: "unset",
                minWidth: "unset",
                px: { xs: 0.75, sm: 2 },
                py: { xs: 0.5, sm: 0.75 },
                color: "text.secondary",
                transition:
                  "color .2s ease, transform .2s ease, background-color .2s ease",
                borderRadius: 0,
                WebkitTapHighlightColor: "transparent",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: (t) =>
                    t.palette.mode === "dark"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                  color: "text.primary",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              },
              "& .MuiTab-root.Mui-selected": {
                color: "primary.main",
                fontWeight: 700,
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(226,139,110,0.08)"
                    : "rgba(180,106,79,0.08)",
              },
            }}
          >
            {tabs.map((t, i) => (
              <Tab
                key={t.href}
                disableRipple
                disableFocusRipple
                label={
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      position: "relative",
                    }}
                  >
                    {value === i && (
                      <Box
                        className="active-pixel-star"
                        sx={(theme) => ({
                          width: { xs: 4, sm: 6 },
                          height: { xs: 4, sm: 6 },
                          bgcolor: theme.palette.primary.main,
                          animation: "pixelPulse 1.5s steps(4) infinite",
                          boxShadow: `0 0 4px ${theme.palette.primary.main}`,
                          flexShrink: 0,
                        })}
                      />
                    )}
                    <span>{t.label}</span>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>

      <style>{`
        @keyframes pixelPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </AppBar>
  );
}
