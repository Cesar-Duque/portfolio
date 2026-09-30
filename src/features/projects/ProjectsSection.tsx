import { useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/shared/components/Section"
import { projects } from "@/data/projects"
import type { Project, ProjectStatus } from "@/types"
import { useInView } from "@/shared/hooks/useInView"
import { cn } from "@/shared/lib/utils"
import {
  X,
  ArrowUpRight,
  GithubLogo,
  BookOpen,
  PlayCircle,
  CheckCircle,
  Clock,
  Archive,
} from "@phosphor-icons/react"
import { MagneticButton } from "@/shared/components/MagneticButton"

const statusMeta: Record<ProjectStatus, { label: string; icon: React.FC<any>; cls: string }> = {
  live: { label: "Online", icon: CheckCircle, cls: "text-terminal-green" },
  wip: { label: "Em construção", icon: Clock, cls: "text-terminal-yellow" },
  archived: { label: "Arquivado", icon: Archive, cls: "text-text-muted" },
}

const linkIcon: Record<string, React.FC<any>> = {
  github: GithubLogo,
  live: ArrowUpRight,
  demo: PlayCircle,
  docs: BookOpen,
}

interface ProjectsProps {
  openProjectSlug: string | null
  onCloseProject: () => void
  onOpenProject: (slug: string) => void
}

// Anti-IA: dimensões variadas por projeto. 8 projetos.
const spanMap: Record<string, string> = {
  p1: "md:col-span-7 md:row-span-2",
  p2: "md:col-span-5",
  p3: "md:col-span-5 md:row-span-2",
  p4: "md:col-span-7",
  p5: "md:col-span-6",
  p6: "md:col-span-6",
  p7: "md:col-span-8",
  p8: "md:col-span-4",
}

function ProjectCoverArt({
  project,
  showLabel = true,
  compact = false,
}: {
  project: Project
  showLabel?: boolean
  compact?: boolean
}) {
  const label = project.id.replace("p", "")
  const accent = project.accentColor ?? "#60A5FA"
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(11,11,11,0.9) 0%, ${accent}15 40%, ${accent}30 100%)`,
      }}
    >
      {/* Grid pattern sutil */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          color: accent,
          maskImage: "radial-gradient(ellipse at 20% 10%, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 20% 10%, black 25%, transparent 75%)",
        }}
      />
      {/* Dots pattern canto */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          color: accent,
          maskImage: "radial-gradient(ellipse at 90% 90%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 90% 90%, black 30%, transparent 75%)",
        }}
      />
      {/* Noise overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay"
      />
      {/* Blob canto superior */}
      <div
        aria-hidden
        className="absolute -top-20 -right-16 h-56 w-56 rounded-full blur-3xl opacity-40"
        style={{ background: accent }}
      />
      {/* Blob canto inferior */}
      <div
        aria-hidden
        className="absolute -bottom-24 -left-12 h-60 w-60 rounded-full blur-3xl opacity-25"
        style={{ background: accent, filter: "blur(80px)" }}
      />

      {/* Número do projeto + label */}
      {showLabel && (
        <div
          className={cn(
            "absolute top-4 left-4 font-mono font-semibold tracking-tight text-text-heading/85 select-none",
            compact ? "text-sm" : "text-base sm:text-lg",
          )}
          style={{ textShadow: `0 0 30px ${accent}80` }}
        >
          <span className="opacity-50">/</span>
          <span className="opacity-100">0{label}</span>
          <span className="opacity-50 ml-2">·</span>
          <span className="opacity-80 ml-2 uppercase tracking-[0.25em] text-[10px]">
            {project.tags[0] ?? "dev"}
          </span>
        </div>
      )}

      {/* Slash diagonal decorativa */}
      <div
        aria-hidden
        className="absolute -top-24 right-[25%] h-[250%] w-[1px] opacity-20 rotate-[22deg]"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
      />
    </div>
  )
}

export function ProjectsSection({
  openProjectSlug,
  onCloseProject,
  onOpenProject,
}: ProjectsProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08 })
  const active = openProjectSlug
    ? projects.find((p) => p.slug === openProjectSlug) ?? null
    : null

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseProject()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active, onCloseProject])

  const orderedProjects = useMemo(() => projects.slice(0, 8), [])

  return (
    <Section
      id="projects"
      eyebrow="03 · Projetos selecionados"
      title="Algumas coisas que construí."
      subtitle="Uma amostra de trabalhos recentes — de MVPs enxutos a plataformas educacionais. Clique em qualquer card para ver detalhes."
    >
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 md:auto-rows-[240px]"
      >
        {orderedProjects.map((p, i) => {
          const meta = statusMeta[p.status]
          const StatusIcon = meta.icon
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.05 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              onClick={() => onOpenProject(p.slug)}
              className={cn(
                "group relative card-surface text-left overflow-hidden cursor-zoom-in",
                spanMap[p.id] ?? "md:col-span-4",
              )}
              style={{
                boxShadow: p.accentColor
                  ? `0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px -40px ${p.accentColor}44`
                  : undefined,
              }}
              data-cursor="hover"
            >
              {/* Capa artística (sem imagem) */}
              <div className="absolute inset-0">
                <ProjectCoverArt project={p} />
              </div>

              {/* Conteúdo */}
              <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="chip !bg-bg/60 backdrop-blur">
                    <span className="font-mono text-text-muted mr-1">#</span>
                    {p.year}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium",
                      meta.cls,
                    )}
                  >
                    <StatusIcon size={12} weight="fill" />
                    {meta.label}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] uppercase tracking-wider font-mono text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tags.length > 4 && (
                      <span className="text-[10px] font-mono text-text-muted">
                        +{p.tags.length - 4}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold tracking-tight text-text-heading text-xl sm:text-2xl leading-tight max-w-md">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text/85 leading-relaxed line-clamp-3 max-w-lg">
                    {p.summary}
                  </p>
                </div>
              </div>

              <div
                aria-hidden
                className="absolute top-4 right-4 rounded-pill bg-bg-soft/70 hairline backdrop-blur-md p-2 opacity-0 group-hover:opacity-100 transition-opacity text-text-heading"
              >
                <ArrowUpRight size={14} />
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={onCloseProject} />}
      </AnimatePresence>
    </Section>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const meta = statusMeta[project.status]
  const StatusIcon = meta.icon
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-bg/85 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative z-10 w-full max-w-5xl bg-bg-soft/80 backdrop-blur-xl hairline-strong rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-soft"
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {/* Header com capa artística (sem imagem) */}
        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
          <ProjectCoverArt project={project} showLabel compact={false} />
          <button
            onClick={onClose}
            aria-label="Fechar detalhe do projeto"
            className="absolute top-4 right-4 rounded-pill bg-bg/70 hairline backdrop-blur p-2 text-text-heading hover:bg-bg-raised"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="eyebrow mb-2 !text-text-heading/80">
                <span className="h-px w-6 bg-accent" />
                {project.role} · {project.year}
              </div>
              <h2 className="font-display font-semibold tracking-tightest text-text-heading text-3xl sm:text-4xl leading-[0.95] text-balance max-w-2xl">
                {project.title}
              </h2>
            </div>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 chip !bg-bg/70 backdrop-blur font-medium shrink-0",
                meta.cls,
              )}
            >
              <StatusIcon size={12} weight="fill" />
              {meta.label}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-7 md:p-9 space-y-6 max-h-[55vh] overflow-y-auto no-scrollbar">
          <header>
            <p className="text-[15px] sm:text-base leading-relaxed text-text/90 max-w-3xl">
              {project.description}
            </p>
          </header>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          <div>
            <div className="eyebrow mb-3">
              <span className="h-px w-6 bg-accent" /> Highlights
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 card-surface p-4 items-start">
                  <CheckCircle
                    size={16}
                    weight="duotone"
                    className="text-accent mt-0.5 shrink-0"
                  />
                  <span className="text-sm leading-relaxed text-text/90">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.links.map((l) => {
                const Icon = linkIcon[l.type] ?? ArrowUpRight
                return (
                  <MagneticButton
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={l.type === "live" ? "primary" : "ghost"}
                  >
                    <Icon size={15} />
                    {l.label}
                  </MagneticButton>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
