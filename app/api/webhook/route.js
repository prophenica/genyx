import { NextResponse } from "next/server";
import { getPayment } from "@/lib/mercadopago";
import { getSiteById, updateSiteContent, updateSiteStatus } from "@/lib/db";
import { generateSiteContent } from "@/lib/ai";

export async function POST(req) {
  try {
    let paymentId = null;
    try { const body = await req.json(); if (body?.type==="payment"&&body?.data?.id) paymentId=String(body.data.id); } catch(_){}
    if (!paymentId) { const {searchParams}=new URL(req.url); paymentId=searchParams.get("id")||searchParams.get("data.id"); }
    if (!paymentId) return NextResponse.json({ok:true});
    const payment = await getPayment(paymentId);
    if (payment.status!=="approved") return NextResponse.json({ok:true});
    const siteId = payment.external_reference;
    if (!siteId) return NextResponse.json({ok:true});
    const site = getSiteById(siteId);
    if (!site||site.status!=="pending") return NextResponse.json({ok:true});
    updateSiteStatus(site.id,"generating");
    try {
      const formData = typeof site.form_data==="string" ? JSON.parse(site.form_data) : site.form_data;
      const content = await generateSiteContent(formData);
      updateSiteContent(site.id, content);
    } catch(err) {
      console.error("[webhook]",err);
      updateSiteStatus(site.id,"failed");
    }
    return NextResponse.json({ok:true});
  } catch(err) {
    return NextResponse.json({error:err.message},{status:500});
  }
}

export async function GET() { return NextResponse.json({ok:true}); }
