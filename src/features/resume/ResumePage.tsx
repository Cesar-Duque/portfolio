import { profile } from "@/data/profile"
import { experience } from "@/data/experience"
import { stack, stackCategories } from "@/data/stack"
import { projects } from "@/data/projects"
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  CheckCircle,
  Printer,
  ArrowLeft,
} from "@phosphor-icons/react"

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-7 last:mb-0 print:mb-5">
      <div className="mb-3 flex items-baseline gap-3 border-b border-neutral-200 pb-1.5">
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-400">
          {eyebrow}
        </span>
        <h2 className="font-display text-lg font-semibold tracking-tight text-neutral-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-medium text-neutral-700">
      {children}
    </span>
  )
}

export function ResumePage() {
  const featuredProjectIds = ["p1", "p4", "p5", "p6", "p7"] // sem portfolio experimental.
  const featuredProjects = projects.filter((p) => featuredProjectIds.includes(p.id))

  const handlePrint = () => window.print()
  const handleBack = () => {
    if (window.history.length > 1) window.history.back()
    else window.location.href = "./"
  }

  return (
    <div className="min-h-svh bg-neutral-100 text-neutral-900 antialiased">
      {/* Barra navegacao (some na impressao) */}
      <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur print:hidden">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <ArrowLeft size={14} />
            Voltar para o portfolio
          </button>
          <div className="hidden sm:block text-xs font-mono text-neutral-500">
            {profile.name} · CV · ultima atualizacao {new Date().toLocaleDateString("pt-BR")}
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            <Printer size={14} />
            Salvar como PDF
          </button>
        </div>
      </div>

      {/* Pagina A4 */}
      <div className="mx-auto w-full max-w-5xl px-4 py-6 print:p-0 print:max-w-none">
        <article
          id="resume-page"
          className="relative mx-auto w-full max-w-[210mm] bg-white px-12 py-12 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] ring-1 ring-neutral-200/80 print:shadow-none print:ring-0 print:p-10"
          style={{ minHeight: "297mm" }}
        >
          {/* Faixa superior */}
          <header className="mb-8 flex flex-col gap-5 border-b border-neutral-200 pb-6 sm:flex-row sm:items-start sm:justify-between print:mb-5">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-neutral-900 sm:text-[2.5rem]">
                {profile.name.split(" ")[0]}{" "}
                <span className="text-neutral-500">{profile.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="mt-1.5 font-display text-base font-medium tracking-tight text-neutral-600">
                {profile.title}
              </p>
              <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-neutral-600">
                {profile.bio[0]}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-[12.5px] text-neutral-600 sm:text-right">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-start gap-2 sm:justify-end hover:text-neutral-900"
              >
                <EnvelopeSimple size={13} className="text-neutral-400" />
                {profile.email}
              </a>
              <a
                href={profile.socials.find((s) => s.icon === "GithubLogo")?.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-start gap-2 sm:justify-end hover:text-neutral-900"
              >
                <GithubLogo size={13} className="text-neutral-400" />
                github.com/Cesar-Duque
              </a>
              <a
                href={profile.socials.find((s) => s.icon === "LinkedinLogo")?.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-start gap-2 sm:justify-end hover:text-neutral-900"
              >
                <LinkedinLogo size={13} className="text-neutral-400" />
                linkedin.com/in/cesar-duque-leal-silva
              </a>
              <span className="inline-flex items-center justify-start gap-2 sm:justify-end">
                <MapPin size={13} className="text-neutral-400" />
                {profile.location}
              </span>
              <span className="mt-1 inline-flex items-center justify-start gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100 sm:justify-self-end">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {profile.availability}
              </span>
            </div>
          </header>

          {/* Perfil */}
          <Section eyebrow="01 · Sobre" title="Perfil profissional">
            <div className="space-y-2.5 text-[13.5px] leading-relaxed text-neutral-700">
              {profile.bio.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Section>

          {/* Formacao */}
          <Section eyebrow="02 · Formação" title="Educação">
            <ul className="space-y-4">
              {profile.education.map((e) => (
                <li key={e.school + e.course} className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[15px] font-semibold tracking-tight text-neutral-900">
                      {e.course}
                    </h3>
                    <p className="mt-0.5 text-[13px] text-neutral-600">{e.school}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600 ring-1 ring-neutral-200">
                    {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Experiencia */}
          <Section eyebrow="03 · Trajetória" title="Experiência profissional">
            <ul className="space-y-5">
              {experience.map((e) => (
                <li key={e.id} className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-[15px] font-semibold tracking-tight text-neutral-900">
                        {e.role}
                      </h3>
                      <p className="mt-0.5 text-[13px] font-medium text-neutral-600">
                        {e.company}
                        <span className="mx-1.5 text-neutral-300">·</span>
                        {e.location}
                        <span className="mx-1.5 text-neutral-300">·</span>
                        <span className="text-neutral-500">
                          {e.remote ? "Remoto" : "Presencial"}
                        </span>
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-medium text-neutral-600 ring-1 ring-neutral-200">
                      {e.period}
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">
                    {e.description}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {e.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[12.5px] leading-relaxed text-neutral-700"
                      >
                        <CheckCircle
                          size={13}
                          weight="duotone"
                          className="mt-0.5 shrink-0 text-neutral-500"
                        />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          {/* Habilidades */}
          <Section eyebrow="04 · Stack" title="Habilidades e tecnologias">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stackCategories
                .filter((c) => stack.some((s) => s.category === c.key))
                .map((c) => {
                  const items = stack.filter((s) => s.category === c.key)
                  if (items.length === 0) return null
                  return (
                    <div
                      key={c.key}
                      className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-3.5"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="h-1 w-5 rounded-full bg-neutral-900" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                          {c.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((s) => (
                          <span
                            key={s.id}
                            className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[11.5px] font-medium text-neutral-700"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                            {s.name}
                            <span className="text-[10px] font-mono text-neutral-400">
                              · {s.since}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
            </div>
          </Section>

          {/* Projetos */}
          <Section eyebrow="05 · Portfólio" title="Projetos em destaque">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {featuredProjects.map((p) => (
                <li
                  key={p.id}
                  className="rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display text-[14.5px] font-semibold tracking-tight text-neutral-900">
                      {p.title}
                    </h4>
                    <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-[10.5px] font-medium text-neutral-600">
                      {p.year}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-neutral-600 line-clamp-2">
                    {p.summary}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10.5px] font-mono uppercase tracking-wider text-neutral-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.links.length > 0 && (
                    <div className="mt-3 flex gap-3 text-[11.5px] font-medium">
                      {p.links.map((l) => (
                        <a
                          key={l.url}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-700 underline-offset-2 hover:text-neutral-900 hover:underline"
                        >
                          {l.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          {/* Footer da pagina */}
          <footer className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-4 text-[11px] text-neutral-500 print:mt-7">
            <span className="font-mono">
              {profile.email} · github.com/Cesar-Duque · linkedin.com/in/cesar-duque-leal-silva
            </span>
            <span className="font-mono uppercase tracking-[0.2em]">
              {profile.name.split(" ").map((n) => n[0]).join("")} · CV
            </span>
          </footer>
        </article>

        {/* Dica (oculta impressao) */}
        <div className="mx-auto mt-5 max-w-[210mm] px-2 pb-10 text-center text-[12px] text-neutral-500 print:hidden">
          Dica: clique em <span className="font-mono text-neutral-900">Salvar como PDF</span> no
          topo, use <span className="font-mono">Margens: Padrão</span> e desmarque{" "}
          <span className="font-mono">Cabeçalhos e rodapés</span>.
        </div>
      </div>
    </div>
  )
}

export default ResumePage
