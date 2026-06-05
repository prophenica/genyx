import { NextResponse } from "next/server";
import { getSiteBySlug } from "@/lib/db";
export async function GET(req,{params}) {
  const site = getSiteBySlug(params.slug);
  if (!site) return NextResponse.json({error:"Not found"},{status:404});
  return NextResponse.json(site);
}
