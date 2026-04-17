import { NextResponse } from "next/server";
import { generateSiteContent, suggestTheme } from "@/lib/ai";
export async function POST(req) {
  try {
    const formData = await req.json();
    const content = await generateSiteContent(formData);
    const theme = formData.theme || suggestTheme(formData.profession);
    return NextResponse.json({ content, theme });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
