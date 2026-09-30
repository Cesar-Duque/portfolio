import type { ExperienceItem } from "@/types"

export const experience: ExperienceItem[] = [
  {
    id: "e1",
    company: "Vilainfo",
    role: "Full Stack Developer · Estágio",
    period: "2024 — 2025",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    location: "Remoto",
    remote: true,
    description:
      "Atuação direta no desenvolvimento de uma plataforma educacional de ponta a ponta, unindo front-end Angular, back-end em C# ASP.NET Core e banco de dados PostgreSQL. Entrega de módulos centrais usados por alunos em processo de preparação para provas e vestibulares.",
    stack: ["Angular", "TypeScript", "C#", "ASP.NET Core", "PostgreSQL", "REST APIs"],
    achievements: [
      "Implementação do módulo de simulados com correção automática e estatísticas por assunto",
      "Sistema de gamificação (rankings, conquistas, progresso) integrado a todas as áreas",
      "Módulo de flashcards com algoritmo de repetição espaçada (SM-2 inspired)",
      "Planejador de estudos inteligente com sugestões personalizadas por usuário",
      "Integração front/back via REST APIs padronizadas em ambiente ágil Scrum",
    ],
  },
  {
    id: "e2",
    company: "Universidade Vila Velha (UVV)",
    role: "Analista de Suporte & Infraestrutura de TI · Estágio",
    period: "2022 — 2024",
    startDate: "2022-01-01",
    endDate: "2024-12-31",
    location: "Presencial",
    remote: false,
    description:
      "Estágio de dois anos em infraestrutura de TI de uma universidade, atuando com suporte técnico direto a usuários, manutenção de sistemas, configuração de ambientes, rede e monitoramento proativo. Base sólida para entender sistemas por dentro antes de escrevê-los.",
    stack: ["Zabbix", "Windows Server", "Redes", "Documentação Técnica"],
    achievements: [
      "Monitoramento de ativos e serviços com Zabbix, reduzindo indisponibilidades por queda não detectada",
      "Manutenção e configuração de ambientes para laboratórios e salas de aula",
      "Documentação de processos de suporte e roteiros de troubleshooting",
      "Suporte técnico presencial a professores e funcionários em sistemas acadêmicos",
    ],
  },
]
