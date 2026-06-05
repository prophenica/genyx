import { randomUUID } from "crypto";
import slugifyLib from "slugify";
export function generateId() { return randomUUID(); }
export function generateSlug(name) {
  const base = slugifyLib(name, { lower: true, strict: true, locale: "pt" });
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}
