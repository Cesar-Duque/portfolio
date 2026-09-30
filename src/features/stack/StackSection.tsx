import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Section } from "@/shared/components/Section"
import { stack, stackCategories } from "@/data/stack"
import { useInView } from "@/shared/hooks/useInView"
import { cn } from "@/shared/lib/utils"
import { projects } from "@/data/projects"
import { TechIcon, TECH_COLORS, type TechId } from "@/shared/components/TechIcon"

type CategoryKey = typeof stackCategories[number]["key"]

export function StackSection() {
  const [category, setCategory] = useState<CategoryKey | "all">("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  const visible = category === "all"
    ? stack
    : stack.filter((s) => s.category === category)

  return (
    <Section
      id="stack"
      eyebrow="02 · Stack & tecnologias"
      title="Ferramentas que uso no dia a dia."
      subtitle="Cada tecnologia abaixo foi usada em pelo menos um projeto real. Clique num card para ver detalhes e projetos relacionados."
    >
      <div ref={ref} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {[{ key: "all", label: "Todas" }, ...stackCategories].map((c) => {
            const active = category === c.key
            return (
              <button
                key={c.key}
                onClick={() => {
                  setCategory(c.key as CategoryKey | "all")
                  setExpanded(null)
                }}
                className={cn(
                  "relative rounded-pill px-4 py-2 text-sm transition-colors",
                  active
                    ? "text-text-heading"
                    : "text-text hover:text-text-heading",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="stack-pill"
                    className="absolute inset-0 rounded-pill bg-bg-soft hairline-strong -z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => {
              const techId = s.techId as TechId
              const brandColor = TECH_COLORS[techId] ?? "#60A5FA"
              const open = expanded === s.id
              const relatedProjects = projects.filter((p) => s.usedIn.includes(p.slug))
              return (
                <motion.button
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.02 + i * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                    layout: { type: "spring", stiffness: 350, damping: 28 },
                  }}
                  onClick={() => setExpanded(open ? null : s.id)}
                  className={cn(
                    "group relative text-left card-surface overflow-hidden transition-all",
                    open
                      ? "col-span-2 sm:col-span-2 md:col-span-2 row-span-1 p-5 hairline-strong"
                      : "p-4 hover:bg-bg-raised/70 hover:-translate-y-0.5",
                  )}
                  style={open ? { boxShadow: `0 20px 60px -20px ${brandColor}55` } : undefined}
                  data-cursor="hover"
                >
                  {/* Glow brand color no expandido */}
                  {open && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl opacity-30"
                      style={{ backgroundColor: brandColor }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div
                      className={cn(
                        "rounded-xl hairline transition-transform duration-300 flex items-center justify-center",
                        open ? "p-3.5 bg-bg-raised/60" : "p-2.5 group-hover:scale-105 bg-bg-raised/60",
                      )}
                      style={{
                        boxShadow: `inset 0 0 0 1px ${brandColor}15, 0 0 0 1px ${brandColor}08`,
                      }}
                    >
                      <TechIcon
                        id={techId}
                        size={open ? 26 : 22}
                        className={cn(
                          "transition-all",
                          open ? "scale-100" : "group-hover:scale-110",
                        )}
                      />
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              "inline-block h-1.5 w-2 rounded-full transition-colors",
                              idx < s.level
                                ? "bg-current"
                                : "bg-white/10",
                            )}
                            style={
                              idx < s.level
                                ? { backgroundColor: brandColor }
                                : undefined
                            }
                          />
                        ))}
                      </div>
                      <div className="mt-1.5 text-[10px] font-mono text-text-muted">
                        desde {s.since}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 relative z-10">
                    <div
                      className="font-display font-semibold text-text-heading text-sm sm:text-base leading-tight"
                      style={open ? { color: brandColor } : undefined}
                    >
                      {s.name}
                    </div>
                    <div className="mt-0.5 text-[11px] uppercase tracking-wider text-text-muted">
                      {stackCategories.find((c) => c.key === s.category)?.label}
                    </div>
                  </div>

                  <AnimatePresence>
                    {open && relatedProjects.length > 0 && (
                      <motion.div
                        key="p"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-4 overflow-hidden relative z-10"
                      >
                        <div className="text-[11px] uppercase tracking-wider text-text-muted mb-2">
                          Usado em {relatedProjects.length} projeto{relatedProjects.length === 1 ? "" : "s"}
                        </div>
                        <ul className="space-y-1.5">
                          {relatedProjects.map((p) => (
                            <li
                              key={p.id}
                              className="flex items-center justify-between gap-2 text-xs rounded-xl bg-bg-raised/70 hairline px-3 py-2"
                            >
                              <span className="text-text-heading/90 font-medium flex items-center gap-2">
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ backgroundColor: p.accentColor ?? brandColor }}
                                />
                                {p.title}
                              </span>
                              <span className="text-text-muted font-mono text-[10px]">
                                {p.year}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
