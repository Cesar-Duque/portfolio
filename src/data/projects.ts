import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "p1",
    slug: "plataforma-educacional",
    title: "Plataforma Educacional",
    summary:
      "Plataforma completa de estudos: simulados, flashcards com repetição espaçada, gamificação e planejador inteligente.",
    description:
      "Desenvolvimento de ponta a ponta de uma plataforma educacional com front-end Angular, back-end em C# ASP.NET Core e banco de dados PostgreSQL. Módulos de simulados com correção automática, sistema de gamificação com rankings e conquistas, flashcards com algoritmo SM-2 e planejador de estudos inteligente por usuário.",
    year: 2024,
    role: "Full Stack Developer",
    tags: ["Angular", "TypeScript", "C#", "ASP.NET Core", "PostgreSQL", "REST APIs"],
    status: "live",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=minimal%20educational%20learning%20platform%20dashboard%20dark%20editorial%20ui%20flashcards%20gamification%20charts&image_size=landscape_16_9",
    accentColor: "#C084FC",
    links: [],
    highlights: [
      "Módulo de simulados com correção automática e filtros por assunto",
      "Sistema de gamificação (rankings, conquistas) impactando engajamento",
      "Flashcards com algoritmo de repetição espaçada SM-2 adaptado",
      "Planejador de estudos inteligente com sugestões personalizadas",
    ],
  },
  {
    id: "p2",
    slug: "portfolio-experimental",
    title: "Portfolio Experimental",
    summary:
      "Este portfolio: fundo WebGL com noise shader + partículas, terminal interativo e animações scroll-linked.",
    description:
      "Página pessoal construída do zero com Vite + React + TS, Three.js para shader de ruído (Simplex) + partículas estilo constelação, terminal emulado com comandos de navegação e animações em Framer Motion com respeito a prefers-reduced-motion. 100% client-side para deploy no GitHub Pages.",
    year: 2026,
    role: "Design & Development",
    tags: ["React", "Three.js", "Framer Motion", "Vite", "Tailwind", "TypeScript"],
    status: "live",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=dark%20editorial%20portfolio%20landing%20page%20terminal%20hero%20purple%20accent%20typography&image_size=landscape_16_9",
    accentColor: "#60A5FA",
    links: [
      { label: "Live", url: "#", type: "live" },
      { label: "GitHub", url: "https://github.com/Cesar-Duque", type: "github" },
    ],
    highlights: [
      "Fundo WebGL com shader de ruído + partículas interligadas estilo constelação",
      "Terminal emulado com comandos (whoami, stack, open, projects, goto, etc)",
      "Scroll-linked animations com respeito a prefers-reduced-motion",
      "Deploy contínuo no GitHub Pages via Actions",
    ],
  },
  {
    id: "p3",
    slug: "llm-pipelines-rag",
    title: "Pipelines de IA & RAG",
    summary:
      "Projetos exploratórios e de estudo com LLMs, busca semântica e automações inteligentes.",
    description:
      "Aprofundamento em Dados e IA: experimentação com embeddings, bancos vetoriais e pipelines RAG (Retrieval Augmented Generation) para aplicações que consultam bases de conhecimento de forma contextual. Estudos ativos com curso oficial mlabonne/llm-course e aplicações práticas integradas a backends PHP/Python.",
    year: 2025,
    role: "Pesquisa & Desenvolvimento",
    tags: ["LLMs", "RAG", "Python", "Embeddings", "IA", "Busca Semântica"],
    status: "wip",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20neural%20network%20purple%20blue%20dark%20background%20ai%20art%20editorial%20minimal&image_size=landscape_16_9",
    accentColor: "#C084FC",
    links: [
      { label: "Curso LLM", url: "https://github.com/Cesar-Duque/llm-course", type: "github" },
    ],
    highlights: [
      "Fork e estudos do roadmap oficial mlabonne/llm-course",
      "Implementação de pipelines RAG com embeddings e busca contextual",
      "Integração de LLMs a backends Laravel/PHP",
      "Automações inteligentes em tarefas repetitivas de dados",
    ],
  },
  {
    id: "p4",
    slug: "gestor-tarefas-laravel-react",
    title: "Gestor de Tarefas Full-Stack",
    summary:
      "Aplicação completa de gerenciamento de tarefas com Laravel 8 + React + Sanctum + Bootstrap.",
    description:
      "Repositório completo de exemplo e estudo: gestão de tarefas (CRUD, categorização, filtros) com API backend em Laravel 8 protegida por Sanctum, e SPA em React integrada via Axios. Front estilizado com Bootstrap. Demonstra autenticação SPA completa, padrão Repository e boas práticas de separação de camadas.",
    year: 2023,
    role: "Full Stack Developer",
    tags: ["Laravel 8", "React", "Sanctum", "Bootstrap", "PHP", "MySQL"],
    status: "live",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=task%20manager%20app%20dashboard%20dark%20mode%20cards%20lists%20minimal%20editorial%20ui&image_size=landscape_4_3",
    accentColor: "#38BDF8",
    links: [
      { label: "GitHub", url: "https://github.com/Cesar-Duque/gestor-tarefas-laravel-react", type: "github" },
    ],
    highlights: [
      "Backend Laravel 8 com autenticação SPA em Sanctum",
      "CRUD completo de tarefas com categorização e filtros",
      "Front React com Axios e Bootstrap",
      "Boilerplate ideal para iniciar projetos Laravel + React",
    ],
  },
  {
    id: "p5",
    slug: "usermanagement-dapper-api",
    title: "UserManagement · Dapper API",
    summary:
      "API de gerenciamento de usuários em ASP.NET Core com Dapper e SQL Server.",
    description:
      "API REST em C# / ASP.NET Core para CRUD de usuários, utilizando Dapper como ORM leve e SQL Server como persistência. Foco em performance de consultas, separação de camadas e padrão Repository. Repositório pinned no GitHub.",
    year: 2024,
    role: "Backend Developer",
    tags: ["C#", "ASP.NET Core", "Dapper", "SQL Server", "REST API", "Repository Pattern"],
    status: "live",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=code%20editor%20c%20sharp%20syntax%20dark%20minimal%20editorial%20ui%20ide&image_size=landscape_4_3",
    accentColor: "#FACC15",
    links: [
      { label: "GitHub", url: "https://github.com/Cesar-Duque/UserManagement.Dapper.API", type: "github" },
    ],
    highlights: [
      "CRUD RESTful com Dapper (performance sobre Entity Framework em consultas)",
      "Padrão Repository para desacoplamento de infraestrutura",
      "Conexão e persistência em SQL Server",
      "Validações básicas e tratamento de erros padronizado",
    ],
  },
  {
    id: "p6",
    slug: "bookcatalog-ef-api",
    title: "BookCatalog · Entity Framework API",
    summary:
      "API de catálogo de livros em ASP.NET Core com Entity Framework Core.",
    description:
      "Contraparte EF Core do projeto Dapper: API REST de gerenciamento de catálogo de livros com ASP.NET Core, Entity Framework Core e SQL Server. Modelagem de entidades relacionais, migrations e consultas LINQ tipadas. Repositório pinned no GitHub.",
    year: 2024,
    role: "Backend Developer",
    tags: ["C#", "ASP.NET Core", "Entity Framework", "SQL Server", "Migrations", "REST API"],
    status: "live",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=book%20catalog%20library%20app%20shelf%20dark%20editorial%20minimal%20photography%20style&image_size=portrait_4_3",
    accentColor: "#4ADE80",
    links: [
      { label: "GitHub", url: "https://github.com/Cesar-Duque/BookCatalog.API", type: "github" },
    ],
    highlights: [
      "Modelagem de entidades relacionais com EF Core",
      "Migrations versionadas para evolução de schema",
      "Consultas LINQ tipadas e Includes para relacionamentos",
      "Complemento perfeito para comparar Dapper vs EF Core",
    ],
  },
  {
    id: "p7",
    slug: "gestao-estoque-php",
    title: "Gestão de Estoque PHP",
    summary:
      "Sistema de controle de estoque em PHP puro com CRUD completo e relatórios.",
    description:
      "Repositório pessoal de estudo e demonstração: sistema básico de gestão de estoque em PHP sem frameworks pesados, com operações CRUD para produtos, movimentações e geração de relatórios simples. Criado em setembro de 2026.",
    year: 2026,
    role: "Full Stack Developer",
    tags: ["PHP", "MySQL", "JavaScript", "CRUD", "Relatórios"],
    status: "wip",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=warehouse%20inventory%20management%20dashboard%20dark%20minimal%20tables%20stock%20cards&image_size=landscape_16_9",
    accentColor: "#F87171",
    links: [
      { label: "GitHub", url: "https://github.com/Cesar-Duque/gestao-estoque", type: "github" },
    ],
    highlights: [
      "CRUD completo de produtos e categorias",
      "Controle de entradas e saídas com cálculo de saldo automático",
      "Relatórios de movimentação e estoque atual",
      "Projeto PHP puro para entendimento da pilha sem frameworks",
    ],
  },
  {
    id: "p8",
    slug: "agenda-php",
    title: "Agenda PHP",
    summary:
      "Aplicação de agenda (contatos e compromissos) em PHP com persistência em banco.",
    description:
      "Repositório de estudo: aplicação de agenda em PHP com cadastro e consulta de contatos/compromissos, autenticação básica e listagem com filtros. Mantida como referência de linguagem e demonstrativo de padrões.",
    year: 2022,
    role: "Desenvolvimento",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    status: "archived",
    cover:
      "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=calendar%20agenda%20app%20dark%20ui%20contacts%20events%20editorial%20minimal&image_size=landscape_4_3",
    accentColor: "#C084FC",
    links: [
      { label: "GitHub", url: "https://github.com/Cesar-Duque/agenda", type: "github" },
    ],
    highlights: [
      "Cadastro e edição de contatos",
      "Gerenciamento de compromissos com data e hora",
      "Autenticação básica de usuários",
      "Filtros e busca textual em listagens",
    ],
  },
]
