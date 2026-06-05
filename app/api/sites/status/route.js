import { NextResponse } from "next/server";
import { getSiteById } from "@/lib/db";
export async function GET(req) {
  const {searchParams}=new URL(req.url);
  const siteId=searchParams.get("siteId");
  if (!siteId) return NextResponse.json({error:"siteId obrigatório"},{status:400});
  const site=getSiteById(siteId);
  if (!site) return NextResponse.json({error:"Não encontrado"},{status:404});
  return NextResponse.json({slug:site.slug,status:site.status});
}
