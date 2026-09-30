import { motion } from "framer-motion"
import { Section } from "@/shared/components/Section"
import { profile } from "@/data/profile"
import { useInView } from "@/shared/hooks/useInView"
import { useMousePosition } from "@/shared/hooks/useMousePosition"
import { Sparkle, Lightning, Faders, Code, Compass } from "@phosphor-icons/react"
import { cn } from "@/shared/lib/utils"

const cards = [
  {
    icon: Faders,
    title: "Backend Sólido",
    text: "Laravel + PHP de um lado, C# + ASP.NET Core do outro. Domínio completo do stack para entregar APIs robustas.",
    accent: "from-accent/30 to-transparent",
  },
  {
    icon: Sparkle,
    title: "IA, LLMs & RAG",
    text: "Integro automações inteligentes com Large Language Models, busca semântica e pipelines de dados.",
    accent: "from-accent-2/30 to-transparent",
  },
  {
    icon: Code,
    title: "Full Stack",
    text: "React e Angular no front, Laravel e ASP.NET no back. End-to-end com TypeScript, REST e bancos relacionais.",
    accent: "from-terminal-green/25 to-transparent",
  },
  {
    icon: Lightning,
    title: "Perfomance que se Sente",
    text: "Boas práticas desde a modelagem do banco até o último CSS. Estruturas limpas e consultas performáticas.",
    accent: "from-terminal-yellow/25 to-transparent",
  },
  {
    icon: Compass,
    title: "Infra & Monitoramento",
    text: "Passei dois anos em infra de TI na UVV. Sei Zabbix, Linux, redes e o quanto um monitoramento bem feito vale.",
    accent: "from-accent/25 to-transparent",
  },
]

export function About() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 })
  const mouse = useMousePosition()

  return (
    <Section
      id="about"
      eyebrow="01 · Sobre mim"
      title="Engenharia com sensibilidade de produto."
      subtitle="Não me limito a entregar código funcional — trabalho para que cada feature seja percebida como valor. Veja abaixo o que isso significa na prática."
    >
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7 space-y-6 text-[15px] sm:text-base leading-relaxed text-text/90">
          {profile.bio.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance"
            >
              {p}
            </motion.p>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-4 flex flex-wrap gap-3"
          >
            <span className="chip">🇧🇷 {profile.location}</span>
            <span className="chip">✉️ {profile.email}</span>
            <span className="chip text-terminal-green">● {profile.availability}</span>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative perspective-1000">
          <div
            className="relative grid grid-cols-2 gap-3 sm:gap-4"
            style={{
              transform: `rotateX(${((mouse.y / window.innerHeight) - 0.5) * -5}deg) rotateY(${((mouse.x / window.innerWidth) - 0.5) * 6}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.2s ease-out",
            }}
          >
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24, rotateX: -12 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.15 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "relative card-surface p-5 sm:p-6 overflow-hidden group",
                  i === 0 && "col-span-2",
                  i === 3 && "col-span-2",
                  i === 4 && "col-span-2",
                )}
                style={{ transform: `translateZ(${i * 4 + 6}px)` }}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-60 bg-gradient-to-br",
                    c.accent,
                  )}
                />
                <div className="relative flex items-start gap-3">
                  <div className="shrink-0 rounded-xl bg-bg-raised/80 hairline p-2.5 text-accent-2">
                    <c.icon size={18} weight="duotone" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm sm:text-base text-text-heading">
                      {c.title}
                    </div>
                    <div className="mt-1 text-xs sm:text-sm leading-relaxed text-text/80">
                      {c.text}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/5 blur-3xl -z-10"
          />
        </div>
      </div>
    </Section>
  )
}
