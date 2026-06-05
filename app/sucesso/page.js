"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
function SuccessContent() {
  const params=useSearchParams();
  const siteId=params.get("siteId");
  const [slug,setSlug]=useState("");
  const [status,setStatus]=useState("aguardando");
  useEffect(()=>{
    if (!siteId) return;
    let attempts=0;
    const interval=setInterval(async()=>{
      attempts++;
      try {
        const res=await fetch(`/api/sites/status?siteId=${siteId}`);
        const data=await res.json();
        if (data.slug) setSlug(data.slug);
        if (data.status==="published") { setStatus("publicado"); clearInterval(interval); }
        else if (data.status==="failed") { setStatus("erro"); clearInterval(interval); }
        else if (data.status==="generating") setStatus("gerando");
      } catch(_){}
      if (attempts>36) { setStatus("timeout"); clearInterval(interval); }
    },5000);
    return ()=>clearInterval(interval);
  },[siteId]);
  const siteUrl=slug&&typeof window!=="undefined"?`${window.location.origin}/site/${slug}`:"";
  const s={page:{minHeight:"100vh",background:"#0a0a0f",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"system-ui",color:"#f1f1f1",textAlign:"center"}};
  return (
    <div style={s.page}>
      <div style={{maxWidth:520,width:"100%"}}>
        {status==="aguardando"&&<><div style={{fontSize:64,marginBottom:24}}>✅</div><h1 style={{fontSize:32,fontWeight:800,color:"#22c55e",marginBottom:16}}>Pagamento confirmado!</h1><p style={{color:"#777",fontSize:17,lineHeight:1.7}}>Seu pagamento foi aprovado. Estamos gerando seu site...</p></>}
        {status==="gerando"&&<><div style={{fontSize:64,marginBottom:24}}>⚙️</div><h1 style={{fontSize:28,fontWeight:800,color:"#6366f1",marginBottom:16}}>Criando seu site...</h1><p style={{color:"#777",fontSize:16,lineHeight:1.7}}>A IA está gerando o conteúdo. Menos de 1 minuto.</p></>}
        {status==="publicado"&&<><div style={{fontSize:72,marginBottom:24}}>🎉</div><h1 style={{fontSize:32,fontWeight:800,color:"#f97316",marginBottom:16}}>Seu site está no ar!</h1><p style={{color:"#777",fontSize:17,lineHeight:1.7,marginBottom:32}}>Parabéns! Acesse pelo link abaixo.</p><div style={{background:"#111",border:"1px solid #2a2a3a",borderRadius:12,padding:"16px 20px",marginBottom:24,wordBreak:"break-all",color:"#f97316",fontSize:15,fontFamily:"monospace"}}>{siteUrl}</div><div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}><a href={siteUrl} target="_blank" rel="noreferrer" style={{background:"linear-gradient(135deg,#f97316,#fb923c)",color:"#fff",padding:"14px 28px",borderRadius:10,fontSize:15,fontWeight:600,textDecoration:"none"}}>Ver meu site →</a><button onClick={()=>{navigator.clipboard?.writeText(siteUrl);alert("Link copiado!");}} style={{background:"#111",border:"1px solid #2a2a3a",color:"#aaa",padding:"14px 28px",borderRadius:10,fontSize:15,cursor:"pointer"}}>📋 Copiar link</button></div></>}
        {status==="erro"&&<><div style={{fontSize:64,marginBottom:24}}>⚠️</div><h1 style={{fontSize:28,fontWeight:800,color:"#ef4444",marginBottom:16}}>Problema na geração</h1><p style={{color:"#777",fontSize:16,lineHeight:1.7}}>Seu pagamento foi confirmado mas houve um erro. Código: <strong style={{color:"#f97316"}}>{siteId}</strong></p></>}
        {status==="timeout"&&<><div style={{fontSize:64,marginBottom:24}}>⏳</div><h1 style={{fontSize:28,fontWeight:800,color:"#f97316",marginBottom:16}}>Ainda processando...</h1><p style={{color:"#777",fontSize:16,lineHeight:1.7,marginBottom:24}}>Aguarde alguns minutos e acesse:</p>{slug&&<a href={`/site/${slug}`} style={{color:"#f97316",fontSize:16}}>/site/{slug}</a>}</>}
      </div>
    </div>
  );
}
export default function SucessoPage() { return <Suspense fallback={<div/>}><SuccessContent/></Suspense>; }
