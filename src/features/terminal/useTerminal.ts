import { useCallback, useEffect, useRef, useState } from "react"
import { commandsMap, parseInput, rid } from "./commands"
import type { OutputLine } from "./commands"
import { profile } from "@/data/profile"

export interface TerminalHandle {
  focus: () => void
  execute: (input: string) => void
  clear: () => void
}

interface UseTerminalOptions {
  onScrollTo: (id: string) => void
  onOpenProject: (slug: string) => void
  initialPrompt?: boolean
}

export function useTerminal({ onScrollTo, onOpenProject, initialPrompt = true }: UseTerminalOptions) {
  const [lines, setLines] = useState<OutputLine[]>(() => {
    const banner = [
      "",
      `   ${profile.name} — portfolio@terminal  v1.0.0`,
      `   Digite 'help' para ver comandos disponíveis.`,
      "",
    ]
    if (!initialPrompt) return []
    return [
      { id: rid(), kind: "ascii", content: banner, timestamp: Date.now() },
      { id: rid(), kind: "system", content: "Sistema inicializado. Terminal pronto.", timestamp: Date.now() },
    ]
  })
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const pushLine = useCallback((line: Omit<OutputLine, "id" | "timestamp">) => {
    setLines((prev) => [
      ...prev,
      { id: rid(), timestamp: Date.now(), ...line },
    ])
  }, [])

  const clear = useCallback(() => {
    setLines([])
  }, [])

  const scrollTo = useCallback(
    (id: string) => {
      onScrollTo(id)
    },
    [onScrollTo],
  )

  const openProject = useCallback(
    (slug: string) => {
      onOpenProject(slug)
    },
    [onOpenProject],
  )

  const execute = useCallback(
    (raw: string) => {
      const input = raw.trim()
      pushLine({ kind: "input", content: `$ ${raw}` })
      if (!input) return

      setHistory((h) => [...h, input])
      setHistoryIndex(-1)

      const { cmd, args } = parseInput(input)
      const def = commandsMap.get(cmd)
      if (!def) {
        pushLine({
          kind: "error",
          content: cmd
            ? `comando não encontrado: ${cmd}. Tente 'help'.`
            : "",
        })
        return
      }
      try {
        const result = def.run(args, {
          pushLine,
          clear,
          scrollTo,
          openProject,
        })
        if (result && typeof (result as Promise<void>).then === "function") {
          ;(result as Promise<void>).catch((e) => {
            pushLine({ kind: "error", content: `Erro: ${String(e)}` })
          })
        }
      } catch (e) {
        pushLine({ kind: "error", content: `Erro: ${String(e)}` })
      }
    },
    [pushLine, clear, scrollTo, openProject],
  )

  const historyUp = useCallback(() => {
    if (history.length === 0) return ""
    const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
    setHistoryIndex(next)
    return history[next] ?? ""
  }, [history, historyIndex])

  const historyDown = useCallback(() => {
    if (historyIndex === -1 || history.length === 0) return ""
    const next = historyIndex + 1
    if (next >= history.length) {
      setHistoryIndex(-1)
      return ""
    }
    setHistoryIndex(next)
    return history[next] ?? ""
  }, [history, historyIndex])

  const focus = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const handler = (e: KeyboardEvent) => {
      if (document.activeElement === el) return
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        el.focus()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return {
    lines,
    inputRef,
    execute,
    clear,
    focus,
    historyUp,
    historyDown,
  }
}
