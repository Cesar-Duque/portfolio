import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/shared/lib/utils"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isTouch || reduceMotion) {
      setHidden(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']",
      )
      setHovering(Boolean(interactive))
    }
    const onEnter = () => setHidden(false)
    const onLeave = () => setHidden(true)

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver)
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <AnimatePresence>
      {!hidden && (
        <>
          <motion.div
            className="pointer-events-none fixed z-[9998] top-0 left-0 mix-blend-difference"
            animate={{
              x: position.x - 8,
              y: position.y - 8,
              scale: hovering ? 0 : 1,
              opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.2 }}
          >
            <div className="h-4 w-4 rounded-full bg-text-heading" />
          </motion.div>
          <motion.div
            className={cn(
              "pointer-events-none fixed z-[9997] top-0 left-0 rounded-full border",
              hovering
                ? "border-accent bg-accent/10 backdrop-blur-[2px]"
                : "border-border-strong",
            )}
            animate={{
              x: position.x - (hovering ? 28 : 20),
              y: position.y - (hovering ? 28 : 20),
              width: hovering ? 56 : 40,
              height: hovering ? 56 : 40,
              opacity: 1,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.4 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
