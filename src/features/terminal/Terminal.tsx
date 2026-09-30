import { forwardRef, type KeyboardEvent, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTerminal } from "./useTerminal"
import type { OutputLine, OutputLineKind } from "./commands"
import { cn } from "@/shared/lib/utils"
import { Minus, Square, X, Circle } from "@phosphor-icons/react"

export interface TerminalProps {
  onScrollTo: (id: string) => void
  onOpenProject: (slug: string) => void
  size?: "compact" | "full"
  showTitleBar?: boolean
  initialPrompt?: boolean
  className?: string
  style?: React.CSSProperties
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
}

const palette: Record<OutputLineKind, string> = {
  system: "text-text-muted",
  input: "text-text-heading font-semibold",
  output: "text-text/90",
  success: "text-terminal-green",
  error: "text-terminal-red",
  info: "text-accent",
  table: "text-text/90",
  ascii: "text-accent-2",
}

function renderLine(line: OutputLine, index: number) {
  const cls = palette[line.kind]
  if (Array.isArray(line.content)) {
    return (
      <div key={line.id} className={cn("font-mono text-xs sm:text-[13px] leading-relaxed", cls)}>
        {line.content.map((row, i) => (
          <div key={`${line.id}-${i}`} className="whitespace-pre-wrap break-words">
            {row || "\u00A0"}
          </div>
        ))}
      </div>
    )
  }
  return (
    <div
      key={line.id}
      className={cn(
        "font-mono text-xs sm:text-[13px] whitespace-pre-wrap break-words leading-relaxed",
        cls,
        index % 5 === 0 ? "" : "",
      )}
    >
      {line.content}
    </div>
  )
}

export const Terminal = forwardRef<HTMLDivElement, TerminalProps>(
  function Terminal(
    {
      onScrollTo,
      onOpenProject,
      size = "compact",
      showTitleBar = true,
      initialPrompt = true,
      className,
      style,
      onClose,
      onMinimize,
      onMaximize,
    },
    ref,
  ) {
    const {
      lines,
      inputRef,
      execute,
      focus,
      historyUp,
      historyDown,
    } = useTerminal({ onScrollTo, onOpenProject, initialPrompt })
    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const el = scrollRef.current
      if (!el) return
      el.scrollTop = el.scrollHeight
    }, [lines])

    const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const val = e.currentTarget.value
        execute(val)
        e.currentTarget.value = ""
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const v = historyUp()
        if (v !== undefined) e.currentTarget.value = v
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        const v = historyDown()
        if (v !== undefined) e.currentTarget.value = v
      } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        execute("clear")
      } else if (e.key === "Tab") {
        e.preventDefault()
        const val = e.currentTarget.value
        // simple tab completion for commands
        const prefix = val.split(/\s+/)[0] ?? ""
        if (!prefix) return
        const names = new Set<string>()
        import("./commands").then((m) => {
          for (const def of m.commandDefinitions) {
            if (def.name.startsWith(prefix)) names.add(def.name)
            for (const a of def.aliases ?? []) if (a.startsWith(prefix)) names.add(a)
          }
          if (names.size === 1) {
            e.currentTarget.value = [...names][0] + (val.slice(prefix.length) ?? "")
          } else if (names.size > 1) {
            execute(`help`)
          }
        })
      }
    }

    const heightClass =
      size === "full"
        ? "h-full"
        : "h-[360px] sm:h-[420px]"

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        onClick={focus}
        className={cn(
          "group relative flex flex-col rounded-2xl hairline-strong overflow-hidden shadow-soft",
          "bg-terminal-bg/85 backdrop-blur-xl",
          heightClass,
          className,
        )}
        data-cursor="hover"
        style={{
          boxShadow:
            "0 0 0 1px rgba(192,132,252,0.08), 0 30px 80px -25px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)",
          ...style,
        }}
      >
        {showTitleBar && (
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-3 w-3 rounded-full bg-terminal-red/90">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose?.()
                  }}
                  className="h-full w-full rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  aria-label="Fechar"
                >
                  <X size={8} weight="bold" className="text-black/70" />
                </button>
              </span>
              <span className="inline-flex items-center justify-center h-3 w-3 rounded-full bg-terminal-yellow/90">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onMinimize?.()
                  }}
                  className="h-full w-full rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  aria-label="Minimizar"
                >
                  <Minus size={8} weight="bold" className="text-black/70" />
                </button>
              </span>
              <span className="inline-flex items-center justify-center h-3 w-3 rounded-full bg-terminal-green/90">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onMaximize?.()
                  }}
                  className="h-full w-full rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
                  aria-label="Maximizar"
                >
                  <Square size={7} weight="bold" className="text-black/70" />
                </button>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
              <Circle size={6} className="text-terminal-green animate-blink" weight="fill" />
              <span>portfolio@cesar — zsh — 80×24</span>
            </div>
            <div className="w-[60px]" aria-hidden />
          </div>
        )}

        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-auto no-scrollbar px-4 py-4 sm:px-5 sm:py-5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-noise opacity-30 mix-blend-overlay"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-terminal-bg/70 to-transparent"
          />

          <div className="relative space-y-1.5">
            {lines.map((l, i) => renderLine(l, i))}

            <div className="flex items-start gap-2 pt-1">
              <span className="font-mono text-xs sm:text-[13px] text-terminal-green whitespace-nowrap select-none">
                ➜ ~/portfolio
                <span className="text-accent"> $</span>
              </span>
              <div className="relative flex-1 min-w-0">
                <input
                  ref={inputRef}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  className="w-full bg-transparent outline-none font-mono text-xs sm:text-[13px] text-text-heading placeholder:text-text-muted caret-transparent"
                  aria-label="Terminal input"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 text-xs sm:text-[13px] font-mono text-text-heading whitespace-pre-wrap break-all"
                  style={{ visibility: "hidden" }}
                >
                  {/* spacer so caret can be measured if needed — leave hidden */}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none inline-block ml-px h-[14px] sm:h-[15px] w-[7px] align-middle bg-terminal-cursor animate-blink"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-scanline"
        />
      </motion.div>
    )
  },
)
