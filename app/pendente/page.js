import Link from "next/link";
export default function PendentePage() {
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0f",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"system-ui",color:"#f1f1f1",textAlign:"center"}}>
      <div style={{maxWidth:460}}>
        <div style={{fontSize:64,marginBottom:24}}>⏳</div>
        <h1 style={{fontSize:30,fontWeight:800,color:"#facc15",marginBottom:16}}>Pagamento em análise</h1>
        <p style={{color:"#777",fontSize:17,lineHeight:1.7,marginBottom:36}}>Seu pagamento está sendo processado. Quando aprovado, seu site será gerado automaticamente.</p>
        <Link href="/" style={{background:"linear-gradient(135deg,#f97316,#fb923c)",color:"#fff",padding:"14px 32px",borderRadius:10,fontSize:15,fontWeight:600,textDecoration:"none"}}>← Voltar ao início</Link>
      </div>
    </div>
  );
}
