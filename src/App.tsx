import { useCallback, useEffect, useState } from "react"
import { Background3D } from "@/features/hero/Background3D"
import { Hero } from "@/features/hero/Hero"
import { About } from "@/features/about/About"
import { StackSection } from "@/features/stack/StackSection"
import { ProjectsSection } from "@/features/projects/ProjectsSection"
import { ExperienceSection } from "@/features/experience/ExperienceSection"
import { ContactSection } from "@/features/contact/ContactSection"
import { CustomCursor } from "@/shared/layouts/CustomCursor"
import { Navigation } from "@/shared/layouts/Navigation"
import { ScrollProgress } from "@/shared/layouts/ScrollProgress"
import { TerminalModal } from "@/features/terminal/TerminalModal"
import { ResumePage } from "@/features/resume/ResumePage"

function isResumeRoute() {
  if (typeof window === "undefined") return false
  const path = window.location.pathname
  const hash = window.location.hash
  return (
    path.endsWith("/resume") ||
    path.endsWith("/resume/") ||
    path.includes("/resume") ||
    hash === "#/resume" ||
    hash === "#resume"
  )
}

function App() {
  const [showResume, setShowResume] = useState<boolean>(() => isResumeRoute())
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null)

  useEffect(() => {
    const onRoute = () => setShowResume(isResumeRoute())
    window.addEventListener("popstate", onRoute)
    window.addEventListener("hashchange", onRoute)
    return () => {
      window.removeEventListener("popstate", onRoute)
      window.removeEventListener("hashchange", onRoute)
    }
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  if (showResume) {
    return <ResumePage />
  }

  return (
    <div className="relative min-h-svh w-full bg-bg overflow-hidden">
      <Background3D particleCount={120} intensity={1} />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-noise opacity-[0.07] mix-blend-overlay z-[1]"
      />

      <CustomCursor />
      <ScrollProgress />
      <Navigation onOpenTerminal={() => setTerminalOpen(true)} />

      <main className="relative z-10">
        <Hero
          onScrollTo={scrollTo}
          onOpenProject={(s) => setOpenProjectSlug(s)}
        />
        <About />
        <StackSection />
        <ProjectsSection
          openProjectSlug={openProjectSlug}
          onCloseProject={() => setOpenProjectSlug(null)}
          onOpenProject={(s) => setOpenProjectSlug(s)}
        />
        <ExperienceSection />
        <ContactSection />
      </main>

      <TerminalModal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onScrollTo={(id) => {
          scrollTo(id)
        }}
        onOpenProject={(s) => setOpenProjectSlug(s)}
      />
    </div>
  )
}

export default App
