"use client";
export default function BoldTemplate({ site }) {
  const { content, name, profession } = site;
  const c = content;
  const phone = (c.contact?.phone || "").replace(/\D/g, "");
  const waLink = `https://wa.me/55${phone}?text=${encodeURIComponent(c.contact?.whatsapp_message || "Olá!")}`;
  const schema = {"@context":"https://schema.org","@type":c.seo?.schema_type||"LocalBusiness","name":c.seo?.schema_name||name,"description":c.seo?.schema_description||"","telephone":c.seo?.schema_phone||""};
  return (
    <div style={{fontFamily:"'Arial Black',Arial,sans-serif",background:"#f5f5f0",color:"#0a0a0a",minHeight:"100vh"}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
      <nav style={{position:"fixed",top:0,width:"100%",background:"#0a0a0a",zIndex:100,padding:"16px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",boxSizing:"border-box"}}>
        <span style={{fontWeight:900,fontSize:20,color:"#fff",textTransform:"uppercase",letterSpacing:2}}>{name}</span>
        <a href={waLink} target="_blank" rel="noreferrer" style={{background:"#ff3b00",color:"#fff",padding:"10px 24px",borderRadius:99,fontSize:14,textDecoration:"none",fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Falar Agora</a>
      </nav>
      <section style={{paddingTop:0,minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",background:"#0a0a0a",overflow:"hidden"}}>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",padding:"120px 60px 80px"}}>
          <div style={{background:"#ff3b00",color:"#fff",display:"inline-block",padding:"6px 16px",borderRadius:99,fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:24,width:"fit-content"}}>{profession}</div>
          <h1 style={{fontSize:"clamp(36px,4.5vw,64px)",fontWeight:900,lineHeight:1.05,color:"#fff",marginBottom:24,textTransform:"uppercase",letterSpacing:-1}}>{c.hero.headline}</h1>
          <p style={{fontSize:18,color:"#999",lineHeight:1.7,marginBottom:40,maxWidth:440}}>{c.hero.subheadline}</p>
          <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#ff3b00",color:"#fff",padding:"18px 40px",borderRadius:99,fontSize:16,fontWeight:700,textDecoration:"none",width:"fit-content",textTransform:"uppercase",letterSpacing:1}}>{c.hero.cta} →</a>
        </div>
        <div style={{background:"#ff3b00",display:"flex",alignItems:"center",justifyContent:"center",fontSize:120,minHeight:"100vh"}}>
          {c.services[0]?.icon||"⚡"}
        </div>
      </section>
      <section style={{padding:"100px 60px",background:"#f5f5f0"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"baseline",gap:20,marginBottom:60}}>
            <h2 style={{fontSize:52,fontWeight:900,textTransform:"uppercase",letterSpacing:-2}}>Serviços</h2>
            <div style={{height:4,background:"#ff3b00",flex:1,marginBottom:8}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:3}}>
            {c.services.map((s,i)=>(
              <div key={i} style={{background:i===0?"#0a0a0a":i===1?"#ff3b00":"#e8e8e0",padding:40,color:i<2?"#fff":"#0a0a0a"}}>
                <div style={{fontSize:48,marginBottom:20}}>{s.icon}</div>
                <h3 style={{fontSize:22,fontWeight:900,marginBottom:12,textTransform:"uppercase"}}>{s.title}</h3>
                <p style={{lineHeight:1.6,fontSize:15,opacity:0.8}}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"100px 60px",background:"#0a0a0a",color:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
          <div>
            <h2 style={{fontSize:48,fontWeight:900,textTransform:"uppercase",letterSpacing:-1,marginBottom:24}}>{c.about.title}</h2>
            <p style={{fontSize:18,color:"#aaa",lineHeight:1.8}}>{c.about.text}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {c.differentials.map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"20px 24px",border:"1px solid #222",borderRadius:4}}>
                <span style={{fontSize:28,flexShrink:0}}>{d.icon}</span>
                <span style={{fontSize:15,color:"#ccc"}}>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {c.faq&&c.faq.length>0&&(
        <section style={{padding:"100px 60px",background:"#f5f5f0"}}>
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <h2 style={{fontSize:48,fontWeight:900,textTransform:"uppercase",letterSpacing:-1,marginBottom:60}}>FAQ</h2>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              {c.faq.map((f,i)=>(
                <div key={i} style={{background:i%2===0?"#0a0a0a":"#ff3b00",padding:"28px 32px",color:"#fff"}}>
                  <h3 style={{fontSize:16,fontWeight:900,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>{f.question}</h3>
                  <p style={{fontSize:15,lineHeight:1.7,opacity:0.85}}>{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section style={{padding:"100px 60px",background:"#f5f5f0"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{fontSize:48,fontWeight:900,textTransform:"uppercase",letterSpacing:-1,marginBottom:60}}>Clientes</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:3}}>
            {c.testimonials.map((t,i)=>(
              <div key={i} style={{background:"#0a0a0a",padding:36,color:"#fff"}}>
                <p style={{fontSize:15,lineHeight:1.8,marginBottom:24,color:"#ccc"}}>"{t.text}"</p>
                <p style={{fontWeight:900,fontSize:14,textTransform:"uppercase",letterSpacing:1}}>{t.name}</p>
                <p style={{fontSize:12,color:"#ff3b00",marginTop:4}}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"100px 60px",background:"#ff3b00",textAlign:"center"}}>
        <h2 style={{fontSize:"clamp(36px,5vw,64px)",fontWeight:900,color:"#fff",textTransform:"uppercase",letterSpacing:-1,marginBottom:16}}>{c.cta_section.headline}</h2>
        <p style={{fontSize:18,color:"rgba(255,255,255,0.8)",marginBottom:48}}>{c.cta_section.text}</p>
        <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#fff",color:"#ff3b00",padding:"20px 48px",borderRadius:99,fontSize:18,fontWeight:900,textDecoration:"none",textTransform:"uppercase",letterSpacing:1}}>{c.cta_section.button} →</a>
      </section>
      <footer style={{background:"#0a0a0a",padding:"32px 60px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16,fontSize:13,color:"#555"}}>
        <span style={{textTransform:"uppercase",letterSpacing:2,color:"#fff",fontWeight:700}}>{name}</span>
        <span>{c.contact.email} · {c.contact.phone}</span>
      </footer>
      <a href={waLink} target="_blank" rel="noreferrer" style={{position:"fixed",bottom:28,right:28,background:"#25d366",color:"#fff",width:56,height:56,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,textDecoration:"none",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",zIndex:999}}>💬</a>
    </div>
  );
}
