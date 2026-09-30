import { motion } from "framer-motion"
import { useScrollProgress } from "@/shared/hooks/useScrollProgress"

export function ScrollProgress() {
  const p = useScrollProgress()
  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50 h-[2px] w-full bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
        style={{ scaleX: p }}
      />
    </div>
  )
}
