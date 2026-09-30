import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Terminal } from "./Terminal"
import { X } from "@phosphor-icons/react"

interface TerminalModalProps {
  open: boolean
  onClose: () => void
  onScrollTo: (id: string) => void
  onOpenProject: (slug: string) => void
}

export function TerminalModal({ open, onClose, onScrollTo, onOpenProject }: TerminalModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-bg/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            className="relative z-10 w-full max-w-5xl h-[78vh] sm:h-[72vh]"
            initial={{ scale: 0.96, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 sm:-top-10 text-text-muted hover:text-text-heading hairline rounded-pill p-2 bg-bg-soft/60 backdrop-blur"
              aria-label="Fechar terminal"
            >
              <X size={16} />
            </button>
            <Terminal
              onScrollTo={onScrollTo}
              onOpenProject={(s) => {
                onOpenProject(s)
                onClose()
              }}
              size="full"
              onClose={onClose}
              onMinimize={onClose}
              onMaximize={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
