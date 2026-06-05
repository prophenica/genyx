import { NextResponse } from "next/server";
import { createSite, updateSiteSessionId } from "@/lib/db";
import { createPreference } from "@/lib/mercadopago";
import { suggestTheme } from "@/lib/ai";
import { generateId, generateSlug } from "@/lib/utils";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, profession, theme: chosenTheme, socials, ...rest } = body;
    
    if (!name || !profession) {
      return NextResponse.json({ error: "Nome e profissão são obrigatórios." }, { status: 400 });
    }
    
    const id = generateId();
    const slug = generateSlug(name);
    const theme = chosenTheme || suggestTheme(profession);
    const email = socials?.email || "";
    const phone = socials?.whatsapp || "";
    
    createSite({
      id,
      slug,
      name,
      profession,
      email,
      phone,
      theme,
      form_data: JSON.stringify({ name, profession, email, phone, theme, socials, ...rest }),
      status: "pending",
      stripe_session_id: null
    });
    
    const preference = await createPreference({ siteId: id, slug, name, email });
    updateSiteSessionId(id, preference.id);
    
    return NextResponse.json({ url: preference.init_point, slug, siteId: id });
  } catch(err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
