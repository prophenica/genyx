"use client";
export default function DarkTemplate({ site }) {
  const { content, name, profession } = site;
  const c = content;
  const gold = "#c9a84c";
  const bg = "#0c0c0e";
  const waLink = `https://wa.me/55${(c.contact?.phone||"").replace(/\D/g,"")}?text=${encodeURIComponent(c.contact?.whatsapp_message||"Olá!")}`;
  return (
    <div style={{fontFamily:"'Georgia',serif",background:bg,color:"#f0ece4",minHeight:"100vh"}}>
      <nav style={{position:"fixed",top:0,width:"100%",background:"rgba(12,12,14,0.92)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${gold}22`,zIndex:100,padding:"20px 48px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:18,letterSpacing:4,textTransform:"uppercase",color:gold}}>{name}</span>
        <a href={waLink} target="_blank" rel="noreferrer" style={{border:`1px solid ${gold}`,color:gold,padding:"10px 24px",fontSize:13,letterSpacing:2,textTransform:"uppercase",textDecoration:"none"}}>Contato</a>
      </nav>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"120px 48px 80px",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at center,${gold}10 0%,transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <p style={{fontSize:11,letterSpacing:6,textTransform:"uppercase",color:gold,marginBottom:32}}>{profession}</p>
          <h1 style={{fontSize:"clamp(38px,6vw,80px)",fontWeight:400,lineHeight:1.1,marginBottom:28,maxWidth:800}}>{c.hero.headline}</h1>
          <div style={{width:60,height:1,background:gold,margin:"0 auto 32px"}}/>
          <p style={{fontSize:18,color:"#a89f8f",lineHeight:1.7,marginBottom:48,maxWidth:480,margin:"0 auto 48px"}}>{c.hero.subheadline}</p>
          <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:gold,color:bg,padding:"16px 40px",fontSize:13,fontWeight:600,letterSpacing:3,textTransform:"uppercase",textDecoration:"none"}}>{c.hero.cta}</a>
        </div>
      </section>
      <section style={{padding:"100px 48px",borderTop:`1px solid ${gold}22`}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <p style={{fontSize:11,letterSpacing:5,textTransform:"uppercase",color:gold,marginBottom:16}}>Serviços</p>
          <h2 style={{fontSize:44,fontWeight:400,marginBottom:64,letterSpacing:-1}}>O que ofereço</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:1,background:`${gold}22`}}>
            {c.services.map((s,i)=>(<div key={i} style={{background:bg,padding:48}}><div style={{fontSize:40,marginBottom:20}}>{s.icon}</div><h3 style={{fontSize:22,fontWeight:400,color:gold,marginBottom:12}}>{s.title}</h3><p style={{color:"#7a7060",lineHeight:1.7,fontSize:15}}>{s.description}</p></div>))}
          </div>
        </div>
      </section>
      <section style={{padding:"100px 48px",background:"#0f0f12",borderTop:`1px solid ${gold}22`,borderBottom:`1px solid ${gold}22`}}>
        <div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontSize:36,fontWeight:400,marginBottom:32}}>{c.about.title}</h2>
          <p style={{fontSize:18,color:"#a89f8f",lineHeight:1.9}}>{c.about.text}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:16,justifyContent:"center",marginTop:48}}>
            {c.differentials.map((d,i)=>(<span key={i} style={{border:`1px solid ${gold}44`,color:gold,padding:"10px 20px",fontSize:13}}>{d.icon} {d.text}</span>))}
          </div>
        </div>
      </section>
      <section style={{padding:"100px 48px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontSize:44,fontWeight:400,marginBottom:64,letterSpacing:-1}}>O que dizem</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:32}}>
            {c.testimonials.map((t,i)=>(<div key={i} style={{borderLeft:`2px solid ${gold}`,paddingLeft:28}}><p style={{fontSize:16,color:"#a89f8f",lineHeight:1.8,marginBottom:20,fontStyle:"italic"}}>"{t.text}"</p><p style={{color:gold,fontSize:14,fontWeight:600}}>{t.name}</p><p style={{color:"#555",fontSize:13}}>{t.role}</p></div>))}
          </div>
        </div>
      </section>
      <section style={{padding:"100px 48px",textAlign:"center",background:"#0f0f12",borderTop:`1px solid ${gold}22`}}>
        <h2 style={{fontSize:48,fontWeight:400,letterSpacing:-1,marginBottom:16}}>{c.cta_section.headline}</h2>
        <p style={{fontSize:18,color:"#7a7060",marginBottom:48}}>{c.cta_section.text}</p>
        <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:gold,color:bg,padding:"18px 48px",fontSize:13,fontWeight:600,letterSpacing:3,textTransform:"uppercase",textDecoration:"none"}}>{c.cta_section.button}</a>
      </section>
      <footer style={{borderTop:`1px solid ${gold}22`,padding:"36px 48px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16,fontSize:13,color:"#555"}}>
        <span style={{textTransform:"uppercase",letterSpacing:3}}>{name}</span><span>{c.contact.email} · {c.contact.phone}</span>
      </footer>
      <a href={waLink} target="_blank" rel="noreferrer" style={{position:"fixed",bottom:28,right:28,background:"#25d366",color:"#fff",width:56,height:56,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,textDecoration:"none",zIndex:999}}>💬</a>
    </div>
  );
}
