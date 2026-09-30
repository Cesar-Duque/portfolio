import { motion } from "framer-motion"
import { Section } from "@/shared/components/Section"
import { profile } from "@/data/profile"
import { MagneticButton } from "@/shared/components/MagneticButton"
import { useInView } from "@/shared/hooks/useInView"
import {
  GithubLogo, LinkedinLogo, XLogo, EnvelopeSimple, ArrowUpRight, Handshake,
} from "@phosphor-icons/react"

const iconByName: Record<string, React.FC<any>> = {
  GithubLogo, LinkedinLogo, XLogo, EnvelopeSimple,
}

export function ContactSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  return (
    <Section
      id="contact"
      eyebrow="05 · Contato"
      title="Vamos construir algo memorável."
      subtitle="Se você tem um projeto em mente, uma oportunidade ou só quer trocar ideia — esse é o caminho."
      className="!pb-32"
    >
      <div ref={ref} className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] aspect-square rounded-full blur-[120px] opacity-30 bg-gradient-to-br from-accent via-accent-2 to-transparent"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative card-surface p-8 sm:p-10 md:p-14 overflow-hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent-2/15 blur-3xl"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="eyebrow mb-5">
                <Handshake size={14} weight="duotone" />
                {profile.availability}
              </div>
              <h3 className="font-display font-semibold tracking-tightest leading-[0.95] text-4xl sm:text-5xl md:text-6xl text-text-heading text-balance">
                Me manda um{" "}
                <span className="bg-gradient-to-r from-accent via-accent to-accent-2 bg-clip-text text-transparent">
                  oi
                </span>
                .
              </h3>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-text/90 max-w-2xl text-balance">
                Respondo todas as mensagens pessoalmente. Se quiser bater um papo rápido sobre
                um projeto, contratação, ou simplesmente discutir arquitetura e design — estou dentro.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <MagneticButton
                  variant="primary"
                  href={`mailto:${profile.email}`}
                  className="shadow-glow"
                >
                  <EnvelopeSimple size={16} weight="duotone" />
                  {profile.email}
                  <ArrowUpRight size={15} />
                </MagneticButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-bg-raised/40 hairline p-5 sm:p-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mb-4">
                  redes sociais
                </div>
                <ul className="divide-y divide-white/5">
                  {profile.socials.map((s, i) => {
                    const Icon = iconByName[s.icon] ?? EnvelopeSimple
                    return (
                      <motion.li
                        key={s.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                      >
                        <a
                          href={s.url}
                          target={s.url.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-3 py-3.5"
                        >
                          <span className="flex items-center gap-3">
                            <span className="rounded-xl bg-bg-soft hairline p-2 text-text-heading group-hover:text-accent transition-colors">
                              <Icon size={16} weight="duotone" />
                            </span>
                            <span className="text-text-heading font-medium">{s.label}</span>
                          </span>
                          <ArrowUpRight
                            size={15}
                            className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          />
                        </a>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted font-mono"
        >
          <span>© {new Date().getFullYear()} {profile.name}. Feito com React · Three.js · Café.</span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-terminal-green shadow-glow" />
            Deploy contínuo no GitHub Pages
          </span>
        </motion.footer>
      </div>
    </Section>
  )
}
