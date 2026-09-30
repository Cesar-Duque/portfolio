import { motion, useScroll, useTransform } from "framer-motion"
import { Section } from "@/shared/components/Section"
import { experience } from "@/data/experience"
import { useRef } from "react"
import { MapPin, Briefcase, CheckCircle } from "@phosphor-icons/react"
import { useInView } from "@/shared/hooks/useInView"
import { cn } from "@/shared/lib/utils"

export function ExperienceSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.08 })
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 65%", "end 35%"],
  })
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <Section
      id="experience"
      eyebrow="04 · Trajetória"
      title="Experiência profissional."
      subtitle="Uma linha do tempo dos últimos anos, com foco em entrega de produto e liderança técnica."
    >
      <div ref={ref} className="relative">
        <div ref={scrollRef} className="relative pl-6 sm:pl-10 lg:pl-14">
          <div
            aria-hidden
            className="absolute left-[7px] sm:left-[15px] lg:left-[19px] top-1 bottom-1 w-px bg-gradient-to-b from-border-strong via-border to-transparent"
          />
          <motion.div
            aria-hidden
            style={{ height }}
            className="absolute left-[7px] sm:left-[15px] lg:left-[19px] top-1 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent origin-top"
          />

          <ol className="space-y-10 sm:space-y-14">
            {experience.map((e, i) => (
              <Item key={e.id} item={e} index={i} inView={inView} />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

function Item({
  item,
  index,
  inView,
}: {
  item: (typeof experience)[number]
  index: number
  inView: boolean
}) {
  const [itemRef, itemInView] = useInView<HTMLLIElement>({ threshold: 0.2 })
  const visible = inView && itemInView
  return (
    <motion.li
      ref={itemRef}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.08 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <span
        aria-hidden
        className={cn(
          "absolute -left-[31px] sm:-left-[49px] lg:-left-[57px] top-1 inline-flex items-center justify-center rounded-full bg-bg hairline-strong",
          "h-3.5 w-3.5 sm:h-5 sm:w-5",
        )}
      >
        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent shadow-glow" />
      </span>

      <div className="card-surface p-5 sm:p-7 overflow-hidden relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-accent/60 via-accent-2/30 to-transparent"
        />
        <div className="relative flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display font-semibold text-text-heading text-xl sm:text-2xl tracking-tight">
                {item.role}
              </h3>
              <span className="chip">
                <Briefcase size={12} className="mr-1 text-accent" weight="duotone" />
                {item.company}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-muted font-mono">
              <span>{item.period}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} />
                {item.location}
                {item.remote}
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-[15px] leading-relaxed text-text/90 max-w-3xl">
          {item.description}
        </p>

        {item.achievements.length > 0 && (
          <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
            {item.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <CheckCircle size={14} weight="duotone" className="text-accent mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm leading-relaxed text-text/85">{a}</span>
              </li>
            ))}
          </ul>
        )}

        {item.stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <span key={s} className="chip text-[11px]">{s}</span>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  )
}
