import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { navSections } from "@/data/nav"
import { cn } from "@/shared/lib/utils"
import { profile } from "@/data/profile"
import { List, X, Terminal } from "@phosphor-icons/react"

interface NavigationProps {
  onOpenTerminal: () => void
}

export function Navigation({ onOpenTerminal }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>(navSections[0].id)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
    navSections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "auto", block: "start" })
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-500",
        scrolled
          ? "pt-3"
          : "pt-6",
      )}
    >
      <div className="container-px">
        <div className="container-max flex items-center justify-between">
          <motion.div
            className={cn(
              "flex items-center gap-3 rounded-pill hairline px-4 py-2 transition-all duration-500",
              scrolled
                ? "bg-bg/75 backdrop-blur-xl shadow-soft hairline-strong"
                : "bg-transparent",
            )}
          >
            <button
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2 text-text-heading"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-glow" />
              <span className="font-display font-semibold tracking-tight text-sm sm:text-base">
                {profile.name}
              </span>
            </button>
            <span className="hidden sm:inline text-xs text-text-muted font-mono">
              / portfolio
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1 rounded-pill hairline px-2 py-1.5 bg-bg/75 backdrop-blur-xl shadow-soft">
            {navSections.slice(1).map((s) => {
              const active = activeId === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={cn(
                    "relative rounded-pill px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active ? "text-text-heading" : "text-text hover:text-text-heading",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-pill bg-bg-raised hairline-strong -z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{s.label}</span>
                </button>
              )
            })}

            <span className="mx-2 h-5 w-px bg-border-strong" aria-hidden />

            <button
              onClick={onOpenTerminal}
              className="group relative flex items-center gap-2 rounded-pill pl-3 pr-2 py-1.5
                         bg-gradient-to-r from-accent via-accent to-accent-2
                         text-white shadow-[0_0_24px_-6px_rgba(192,132,252,0.7)]
                         ring-1 ring-accent/40 hover:brightness-110 hover:shadow-[0_0_32px_-4px_rgba(192,132,252,0.85)]
                         transition-all active:scale-95"
              title="Abrir terminal — Ctrl+K / ⌘K"
            >
              <span className="absolute inset-0 rounded-pill bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <Terminal size={15} weight="bold" className="drop-shadow" />
              <span className="relative z-10 text-xs font-semibold tracking-tight">
                Terminal
              </span>
              <kbd className="relative z-10 flex items-center gap-0.5 rounded-md bg-black/25 ring-1 ring-white/20 px-1.5 py-0.5 text-[9.5px] font-mono font-semibold text-white/90">
                <span className="sm:hidden">Ctrl</span>
                <span className="hidden sm:inline">⌘</span>
                <span>K</span>
              </kbd>
            </button>
          </nav>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenTerminal}
              className="rounded-pill p-2 text-white
                         bg-gradient-to-r from-accent via-accent to-accent-2
                         shadow-[0_0_20px_-4px_rgba(192,132,252,0.75)]
                         ring-1 ring-accent/40 active:scale-95 transition-all"
              aria-label="Abrir terminal"
              title="Abrir terminal — Ctrl+K / ⌘K"
            >
              <Terminal size={17} weight="bold" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-pill hairline p-2 text-text-heading bg-bg/75 backdrop-blur"
              aria-label="Abrir menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {open ? <X size={16} /> : <List size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-3 px-6 sm:px-8"
          >
            <div className="mx-auto max-w-7xl rounded-2xl bg-bg-soft/95 backdrop-blur-xl hairline-strong p-3 shadow-soft">
              {navSections.map((s) => {
                const active = activeId === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={cn(
                      "flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-sm",
                      active
                        ? "bg-bg-raised text-text-heading"
                        : "text-text hover:text-text-heading hover:bg-bg-raised/50",
                    )}
                  >
                    <span>{s.label}</span>
                    {s.command && (
                      <span className="text-xs font-mono text-text-muted">{s.command}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
