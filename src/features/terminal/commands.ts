import type { Project } from "@/types"
import { projects } from "@/data/projects"
import { stack } from "@/data/stack"
import { profile } from "@/data/profile"
import { experience } from "@/data/experience"
import { navSections } from "@/data/nav"

export type OutputLineKind = "system" | "input" | "output" | "success" | "error" | "info" | "table" | "ascii"

export interface OutputLine {
  id: string
  kind: OutputLineKind
  content: string | string[]
  timestamp?: number
}

export interface CommandContext {
  scrollTo: (id: string) => void
  openProject: (slug: string) => void
  pushLine: (line: Omit<OutputLine, "id" | "timestamp">) => void
  clear: () => void
}

export interface CommandDefinition {
  name: string
  aliases?: string[]
  description: string
  usage?: string
  run: (args: string[], ctx: CommandContext) => void | Promise<void>
}

const out = (kind: OutputLineKind, content: string | string[]): Omit<OutputLine, "id" | "timestamp"> => ({
  kind,
  content,
})

function rid(): string {
  return Math.random().toString(36).slice(2, 10)
}

const projectsMap = new Map(projects.map((p) => [p.slug, p]))

const projectRow = (p: Project): string =>
  `  ${p.slug.padEnd(24)} ${String(p.year).padEnd(5)} ${p.status.padEnd(9)} ${p.title}`

export const commandDefinitions: CommandDefinition[] = [
  {
    name: "help",
    aliases: ["h", "?"],
    description: "Lista todos os comandos disponíveis",
    run: (_args, ctx) => {
      const rows = commandDefinitions
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => {
          const alias = c.aliases?.length ? ` (${c.aliases.join(", ")})` : ""
          return `  ${(c.name + alias).padEnd(22)} ${c.description}`
        })
      ctx.pushLine(out("info", "Comandos disponíveis:"))
      ctx.pushLine(out("table", rows))
    },
  },
  {
    name: "clear",
    aliases: ["cls"],
    description: "Limpa a tela do terminal",
    run: (_args, ctx) => {
      ctx.clear()
    },
  },
  {
    name: "whoami",
    description: "Exibe informações sobre mim",
    run: (_args, ctx) => {
      ctx.pushLine(out("success", profile.name))
      ctx.pushLine(out("output", profile.title))
      ctx.pushLine(out("output", `🇧🇷 ${profile.location}  ·  ✉️ ${profile.email}`))
      ctx.pushLine(out("info", profile.availability))
    },
  },
  {
    name: "about",
    aliases: ["bio", "sobre"],
    description: "Rola até a seção Sobre",
    run: (_args, ctx) => {
      ctx.pushLine(out("info", "Navegando para sobre mim..."))
      profile.bio.forEach((p) => ctx.pushLine(out("output", p)))
      ctx.scrollTo("about")
    },
  },
  {
    name: "home",
    aliases: ["top", "inicio"],
    description: "Volta para o topo da página",
    run: (_args, ctx) => {
      ctx.pushLine(out("info", "Voltando para o topo..."))
      ctx.scrollTo("hero")
    },
  },
  {
    name: "stack",
    aliases: ["skills", "tech", "tecnologias"],
    description: "Lista stack tecnológica. Uso: stack [frontend|backend|data|devops|tools]",
    usage: "stack [categoria]",
    run: (args, ctx) => {
      const filter = args[0]?.toLowerCase()
      const list = filter ? stack.filter((s) => s.category === filter) : stack
      if (filter && list.length === 0) {
        ctx.pushLine(out("error", `Categoria '${filter}' não encontrada.`))
        return
      }
      ctx.pushLine(out("info", filter ? `Stack · ${filter} (${list.length}):` : `Stack completa (${list.length}):`))
      const rows = list.map((s) => {
        const level = "■".repeat(s.level) + "□".repeat(5 - s.level)
        return `  ${s.name.padEnd(20)} ${level}  ${s.category}`
      })
      ctx.pushLine(out("table", rows))
      ctx.scrollTo("stack")
    },
  },
  {
    name: "projects",
    aliases: ["proj", "projetos", "ls"],
    description: "Lista projetos do portfólio",
    usage: "projects [--open <slug>]",
    run: (args, ctx) => {
      const openIdx = args.indexOf("--open")
      if (openIdx >= 0 && args[openIdx + 1]) {
        const slug = args[openIdx + 1]
        const p = projectsMap.get(slug)
        if (!p) {
          ctx.pushLine(out("error", `Projeto '${slug}' não encontrado. Use 'projects' para listar.`))
          return
        }
        ctx.pushLine(out("success", `Abrindo projeto: ${p.title}`))
        ctx.openProject(slug)
        ctx.scrollTo("projects")
        return
      }
      ctx.pushLine(out("info", `Projetos (${projects.length}):`))
      ctx.pushLine(out("table", [
        "  slug                      ano   status    título",
        "  ──────────────────────────────────────────────────────",
        ...projects.map(projectRow),
      ]))
      ctx.pushLine(out("info", "Dica: use `projects --open <slug>` ou `open <slug>` para abrir."))
      ctx.scrollTo("projects")
    },
  },
  {
    name: "open",
    description: "Abre detalhe de um projeto. Uso: open <slug>",
    usage: "open <slug>",
    run: (args, ctx) => {
      const slug = args[0]
      if (!slug) {
        ctx.pushLine(out("error", "Informe o slug do projeto. Uso: open <slug>"))
        return
      }
      const p = projectsMap.get(slug)
      if (!p) {
        ctx.pushLine(out("error", `Projeto '${slug}' não encontrado.`))
        return
      }
      ctx.pushLine(out("success", `Projeto · ${p.title} (${p.year})`))
      ctx.pushLine(out("output", p.description))
      ctx.pushLine(out("info", `Tags: ${p.tags.join(", ")}  ·  Role: ${p.role}`))
      ctx.openProject(slug)
      ctx.scrollTo("projects")
    },
  },
  {
    name: "experience",
    aliases: ["exp", "xp", "carreira"],
    description: "Lista experiência profissional",
    run: (_args, ctx) => {
      ctx.pushLine(out("info", "Experiência profissional:"))
      const rows = experience.map((e) => [
        `  ▸ ${e.company} — ${e.role}`,
        `    ${e.period}  ·  ${e.location}${e.remote ? "" : ""}`,
      ]).flat()
      ctx.pushLine(out("table", rows))
      ctx.scrollTo("experience")
    },
  },
  {
    name: "contact",
    aliases: ["contato", "email", "social"],
    description: "Exibe informações de contato",
    run: (_args, ctx) => {
      ctx.pushLine(out("info", "Contato & redes:"))
      const rows = [
        `  ✉️  Email     ${profile.email}`,
        ...profile.socials.map((s) => {
          const icon = s.icon.toLowerCase().includes("github") ? "⌘" : s.icon.toLowerCase().includes("linkedin") ? "in" : s.icon.toLowerCase().includes("xlogo") ? "x" : s.icon.toLowerCase().includes("envelope") ? "✉" : "•"
          return `  ${icon}  ${s.label.padEnd(9)} ${s.url}`
        }),
      ]
      ctx.pushLine(out("table", rows))
      ctx.scrollTo("contact")
    },
  },
  {
    name: "goto",
    aliases: ["cd", "go", "nav"],
    description: "Navega para uma seção. Uso: goto <about|stack|projects|experience|contact>",
    usage: "goto <seção>",
    run: (args, ctx) => {
      const id = args[0]?.toLowerCase()
      const section = navSections.find((n) => n.id === id || n.command === id)
      if (!section) {
        ctx.pushLine(out("error", `Seção '${id ?? ""}' não encontrada.`))
        return
      }
      ctx.pushLine(out("info", `Navegando para ${section.label}...`))
      ctx.scrollTo(section.id)
    },
  },
  {
    name: "banner",
    aliases: ["logo"],
    description: "Mostra banner ASCII",
    run: (_args, ctx) => {
      const ascii = [
        "   ╔══════════════════════════════════════════════════════╗",
        "   ║                                                      ║",
        `   ║   ${profile.name.padEnd(50)} ║`,
        `   ║   ${profile.title.padEnd(50)} ║`,
        "   ║                                                      ║",
        "   ║   type `help` para listar comandos                   ║",
        "   ║                                                      ║",
        "   ╚══════════════════════════════════════════════════════╝",
      ]
      ctx.pushLine(out("ascii", ascii))
    },
  },
  {
    name: "echo",
    description: "Repete o que foi digitado",
    usage: "echo <texto>",
    run: (args, ctx) => {
      ctx.pushLine(out("output", args.join(" ")))
    },
  },
  {
    name: "date",
    description: "Exibe data e hora atual",
    run: (_args, ctx) => {
      ctx.pushLine(out("output", new Date().toLocaleString("pt-BR")))
    },
  },
  {
    name: "sudo",
    description: "Easter egg.",
    usage: "sudo <qualquer coisa>",
    run: (args, ctx) => {
      if (args[0] === "hack") {
        ctx.pushLine(out("error", "Permissão negada. brincadeira... ou não 🤫"))
        return
      }
      ctx.pushLine(out("info", `Executando como root: ${args.join(" ") || "(nada)"} ... não mesmo.`))
    },
  },
]

export const commandsMap = new Map<string, CommandDefinition>()
for (const def of commandDefinitions) {
  commandsMap.set(def.name, def)
  for (const a of def.aliases ?? []) commandsMap.set(a, def)
}

export function parseInput(input: string): { cmd: string; args: string[] } {
  const parts = input.trim().split(/\s+/)
  const cmd = parts.shift()?.toLowerCase() ?? ""
  return { cmd, args: parts }
}

export { rid }
