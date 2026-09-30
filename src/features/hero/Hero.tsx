import { motion } from "framer-motion"
import { profile } from "@/data/profile"
import { MagneticButton } from "@/shared/components/MagneticButton"
import { ArrowDown, ArrowRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react"

interface HeroProps {
  onScrollTo: (id: string) => void
}

export function Hero({ onScrollTo }: HeroProps) {
  const titleChars = profile.name.split("")
  const taglineWords = profile.tagline.split(" ")

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] container-px pt-28 sm:pt-32 md:pt-36 pb-20 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-grad-accent" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] aspect-square rounded-full blur-[120px] opacity-40 bg-accent animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[20%] right-[-10%] w-[40vw] max-w-[500px] aspect-square rounded-full blur-[100px] opacity-30 bg-accent-2 animate-blob"
        style={{ animationDelay: "-6s" }}
      />

      <div className="container-max relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-6"
        >
          <span className="h-px w-6 bg-accent" />
          {profile.availability}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative font-display font-semibold tracking-tightest leading-[0.86] text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8.5rem]"
        >
          <span className="block mb-3 whitespace-nowrap break-keep max-w-full">
            {titleChars.map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.05 + i * 0.025,
                }}
                className="inline-block whitespace-nowrap text-text-heading"
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="block bg-gradient-to-r from-text-heading via-text-heading/90 to-text-muted bg-clip-text text-transparent"
          >
            {profile.title}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-text/90 text-balance"
        >
          {taglineWords.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0)" }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.035 }}
              className="inline-block mr-[0.28em]"
            >
              {w}
            </motion.span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <MagneticButton
            variant="primary"
            onClick={() => onScrollTo("projects")}
            className="shadow-glow"
          >
            Ver projetos
            <ArrowRight size={16} weight="bold" />
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => onScrollTo("contact")}>
            Vamos conversar
            <ArrowDown size={14} />
          </MagneticButton>
          <div className="h-8 w-px bg-border-strong mx-1 hidden sm:block" />
          <a
            href={profile.socials.find((s) => s.icon === "GithubLogo")?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill hairline p-2.5 text-text hover:text-text-heading hover:bg-bg-soft/80 hover:hairline-strong transition-colors"
            aria-label="GitHub"
          >
            <GithubLogo size={16} />
          </a>
          <a
            href={profile.socials.find((s) => s.icon === "LinkedinLogo")?.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill hairline p-2.5 text-text hover:text-text-heading hover:bg-bg-soft/80 hover:hairline-strong transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinLogo size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-14 grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl"
        >
          {profile.facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.35 + i * 0.08 }}
              className="relative"
            >
              <div className="text-3xl sm:text-4xl font-display font-semibold tracking-tighter2 text-text-heading">
                {f.value}
              </div>
              <div className="mt-1 text-xs text-text-muted">{f.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-text-muted"
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
