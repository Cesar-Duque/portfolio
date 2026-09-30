import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function smoothstep(min: number, max: number, x: number): number {
  const t = clamp((x - min) / (max - min), 0, 1)
  return t * t * (3 - 2 * t)
}

export function randomId(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function formatYear(date: string): string {
  return new Date(date).getFullYear().toString()
}
