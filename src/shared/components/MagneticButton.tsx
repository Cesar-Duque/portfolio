import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useCallback } from "react"
import { cn } from "@/shared/lib/utils"

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
  variant?: "primary" | "ghost" | "subtle"
  href?: string
  target?: string
  rel?: string
  children: ReactNode
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    { strength = 18, variant = "ghost", className, children, href, target, rel, ...rest },
    ref,
  ) => {
    const localRef = useRef<HTMLElement | null>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const scale = useMotionValue(1)
    const sx = useSpring(x, { stiffness: 160, damping: 15, mass: 0.3 })
    const sy = useSpring(y, { stiffness: 160, damping: 15, mass: 0.3 })
    const sscale = useSpring(scale, { stiffness: 260, damping: 22 })

    const setRef = useCallback(
      (node: HTMLElement | null) => {
        localRef.current = node
        if (typeof ref === "function") ref(node as HTMLButtonElement)
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
      },
      [ref],
    )

    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const relX = e.clientX - rect.left - rect.width / 2
      const relY = e.clientY - rect.top - rect.height / 2
      x.set((relX / rect.width) * strength * 2)
      y.set((relY / rect.height) * strength * 2)
      scale.set(1.04)
    }

    const onMouseLeave = () => {
      x.set(0)
      y.set(0)
      scale.set(1)
    }

    const base =
      variant === "primary"
        ? "btn-pill-primary"
        : variant === "subtle"
          ? "btn-pill bg-transparent hover:bg-bg-soft/60 text-text hover:text-text-heading hairline hover:hairline-strong"
          : "btn-pill-ghost"

    const style: any = { x: sx, y: sy, scale: sscale }

    if (href) {
      return (
        <motion.a
          ref={setRef as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          className={cn(base, className)}
          style={style}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </motion.a>
      )
    }

    const MotionButton = motion.button as any
    return (
      <MotionButton
        ref={setRef as React.Ref<HTMLButtonElement>}
        {...rest}
        className={cn(base, className)}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </MotionButton>
    )
  },
)

MagneticButton.displayName = "MagneticButton"
