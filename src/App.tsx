import { useCallback, useState } from "react"
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

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [openProjectSlug, setOpenProjectSlug] = useState<string | null>(null)

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

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
