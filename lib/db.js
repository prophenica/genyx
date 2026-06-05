import fs from "fs";
import path from "path";

const DB_DIR = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "db.json");

function readDb() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ sites: [] }));
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch { return { sites: [] }; }
}

function writeDb(data) {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function createSite(data) {
  const db = readDb();
  db.sites.push({ ...data, created_at: Date.now() });
  writeDb(db);
}

export function getSiteBySlug(slug) {
  const db = readDb();
  const site = db.sites.find(s => s.slug === slug);
  if (!site) return null;
  return { ...site, content: site.content ? (typeof site.content === "string" ? JSON.parse(site.content) : site.content) : null, form_data: site.form_data ? (typeof site.form_data === "string" ? JSON.parse(site.form_data) : site.form_data) : null };
}

export function getSiteById(id) {
  const db = readDb();
  const site = db.sites.find(s => s.id === id);
  if (!site) return null;
  return { ...site, content: site.content ? (typeof site.content === "string" ? JSON.parse(site.content) : site.content) : null, form_data: site.form_data ? (typeof site.form_data === "string" ? JSON.parse(site.form_data) : site.form_data) : null };
}

export function getSiteBySessionId(sessionId) {
  const db = readDb();
  const site = db.sites.find(s => s.stripe_session_id === sessionId);
  if (!site) return null;
  return { ...site, content: site.content ? (typeof site.content === "string" ? JSON.parse(site.content) : site.content) : null, form_data: site.form_data ? (typeof site.form_data === "string" ? JSON.parse(site.form_data) : site.form_data) : null };
}

export function updateSiteContent(id, content) {
  const db = readDb();
  const idx = db.sites.findIndex(s => s.id === id);
  if (idx === -1) return;
  db.sites[idx].content = content;
  db.sites[idx].status = "published";
  writeDb(db);
}

export function updateSiteStatus(id, status) {
  const db = readDb();
  const idx = db.sites.findIndex(s => s.id === id);
  if (idx === -1) return;
  db.sites[idx].status = status;
  writeDb(db);
}

export function updateSiteSessionId(id, sessionId) {
  const db = readDb();
  const idx = db.sites.findIndex(s => s.id === id);
  if (idx === -1) return;
  db.sites[idx].stripe_session_id = sessionId;
  writeDb(db);
}
