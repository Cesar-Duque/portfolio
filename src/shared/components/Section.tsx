import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/shared/lib/utils"
import { useInView } from "@/shared/hooks/useInView"
import { motion } from "framer-motion"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string
  title?: string
  subtitle?: string
  id: string
  childrenClassName?: string
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { id, eyebrow, title, subtitle, className, childrenClassName, children, ...rest },
    ref,
  ) => {
    const [innerRef, inView] = useInView<HTMLElement>({ threshold: 0.1 })

    const setRef = (node: HTMLElement | null) => {
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
      innerRef.current = node
    }

    return (
      <section
        ref={setRef}
        id={id}
        className={cn(
          "relative py-24 sm:py-32 md:py-40 container-px scroll-mt-24",
          className,
        )}
        {...rest}
      >
        <div className={cn("container-max", childrenClassName)}>
          {(eyebrow || title || subtitle) && (
            <motion.header
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14 md:mb-20 max-w-3xl"
            >
              {eyebrow && (
                <span className="eyebrow mb-4">
                  <span className="h-px w-6 bg-accent" />
                  {eyebrow}
                </span>
              )}
              {title && (
                <h2 className="section-title mb-5 text-balance">{title}</h2>
              )}
              {subtitle && (
                <p className="text-base sm:text-lg leading-relaxed text-text/90 max-w-2xl">
                  {subtitle}
                </p>
              )}
            </motion.header>
          )}
          {children}
        </div>
      </section>
    )
  },
)

Section.displayName = "Section"
