export type ProjectStatus = "live" | "wip" | "archived"

export interface ProjectLink {
  label: string
  url: string
  type: "github" | "live" | "demo" | "docs"
}

export interface Project {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  year: number
  role: string
  tags: string[]
  status: ProjectStatus
  cover: string
  accentColor?: string
  links: ProjectLink[]
  highlights: string[]
}

export interface StackItem {
  id: string
  name: string
  category: "frontend" | "backend" | "devops" | "data" | "tools"
  level: 1 | 2 | 3 | 4 | 5
  icon: string
  usedIn: string[]
  since: number
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  period: string
  startDate: string
  endDate?: string
  location: string
  remote: boolean
  description: string
  stack: string[]
  achievements: string[]
}

export interface NavSection {
  id: string
  label: string
  command?: string
}
