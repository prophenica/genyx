"use client";
export default function NatureTemplate({ site }) {
  const { content, name, profession } = site;
  const c = content;
  const phone = (c.contact?.phone || "").replace(/\D/g, "");
  const waLink = `https://wa.me/55${phone}?text=${encodeURIComponent(c.contact?.whatsapp_message || "Olá!")}`;
  const schema = {"@context":"https://schema.org","@type":c.seo?.schema_type||"LocalBusiness","name":c.seo?.schema_name||name,"description":c.seo?.schema_description||"","telephone":c.seo?.schema_phone||""};
  const green = "#2d5a27";
  const sage = "#7a9e76";
  const cream = "#f7f3ec";
  const terra = "#c17f3a";
  return (
    <div style={{fontFamily:"'Georgia',serif",background:cream,color:"#2a2a1e",minHeight:"100vh"}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
      <nav style={{position:"fixed",top:0,width:"100%",background:`rgba(247,243,236,0.96)`,backdropFilter:"blur(8px)",borderBottom:`1px solid ${sage}44`,zIndex:100,padding:"16px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",boxSizing:"border-box"}}>
        <div>
          <span style={{fontWeight:700,fontSize:20,color:green,letterSpacing:0.5}}>{name}</span>
          <span style={{display:"block",fontSize:11,color:sage,letterSpacing:2,textTransform:"uppercase"}}>{profession}</span>
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" style={{background:green,color:"#fff",padding:"10px 24px",borderRadius:99,fontSize:14,textDecoration:"none",fontWeight:600,letterSpacing:0.5}}>Agendar Agora</a>
      </nav>
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"120px 48px 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,width:"45%",height:"100%",background:`linear-gradient(135deg,${sage}22,${green}33)`,borderRadius:"0 0 0 60%"}}/>
        <div style={{position:"absolute",bottom:-40,left:-40,width:200,height:200,borderRadius:"50%",background:`${terra}15`}}/>
        <div style={{maxWidth:680,position:"relative",zIndex:1}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${green}15`,border:`1px solid ${green}33`,borderRadius:99,padding:"6px 18px",fontSize:12,color:green,letterSpacing:2,textTransform:"uppercase",marginBottom:32}}>
            🌿 {profession}
          </div>
          <h1 style={{fontSize:"clamp(32px,5vw,62px)",fontWeight:700,lineHeight:1.15,marginBottom:24,color:green,fontStyle:"italic"}}>{c.hero.headline}</h1>
          <p style={{fontSize:18,color:"#5a5a4a",lineHeight:1.8,marginBottom:48,maxWidth:500}}>{c.hero.subheadline}</p>
          <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
            <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:green,color:"#fff",padding:"16px 36px",borderRadius:99,fontSize:16,fontWeight:600,textDecoration:"none"}}>{c.hero.cta} 🌿</a>
            <a href="#servicos" style={{display:"inline-block",background:"transparent",color:green,padding:"16px 36px",borderRadius:99,fontSize:16,fontWeight:600,textDecoration:"none",border:`2px solid ${green}`}}>Ver serviços</a>
          </div>
        </div>
      </section>
      <section id="servicos" style={{padding:"100px 48px",background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:64}}>
            <span style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:sage}}>O que ofereço</span>
            <h2 style={{fontSize:42,fontWeight:700,color:green,marginTop:12,fontStyle:"italic"}}>Serviços</h2>
            <div style={{width:60,height:2,background:terra,margin:"20px auto 0"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:28}}>
            {c.services.map((s,i)=>(
              <div key={i} style={{background:cream,borderRadius:20,padding:36,border:`1px solid ${sage}33`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:`${green}10`}}/>
                <div style={{fontSize:44,marginBottom:20}}>{s.icon}</div>
                <h3 style={{fontSize:21,fontWeight:700,color:green,marginBottom:12,fontStyle:"italic"}}>{s.title}</h3>
                <p style={{color:"#5a5a4a",lineHeight:1.7,fontSize:15}}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"100px 48px",background:`linear-gradient(135deg,${green},#1a3d16)`,color:"#fff"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
          <div>
            <span style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:`${sage}`}}>Sobre</span>
            <h2 style={{fontSize:38,fontWeight:700,marginTop:12,marginBottom:24,fontStyle:"italic",color:"#fff"}}>{c.about.title}</h2>
            <p style={{fontSize:17,color:"rgba(255,255,255,0.8)",lineHeight:1.9}}>{c.about.text}</p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {c.differentials.map((d,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"18px 24px",background:"rgba(255,255,255,0.1)",borderRadius:12,border:"1px solid rgba(255,255,255,0.15)"}}>
                <span style={{fontSize:26,flexShrink:0}}>{d.icon}</span>
                <span style={{fontSize:15,color:"rgba(255,255,255,0.9)"}}>{d.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {c.faq&&c.faq.length>0&&(
        <section style={{padding:"100px 48px",background:cream}}>
          <div style={{maxWidth:800,margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:64}}>
              <span style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:sage}}>Dúvidas</span>
              <h2 style={{fontSize:42,fontWeight:700,color:green,marginTop:12,fontStyle:"italic"}}>Perguntas Frequentes</h2>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {c.faq.map((f,i)=>(
                <div key={i} style={{background:"#fff",borderRadius:16,padding:28,border:`1px solid ${sage}33`}}>
                  <h3 style={{fontSize:17,fontWeight:700,color:green,marginBottom:10}}>{f.question}</h3>
                  <p style={{color:"#5a5a4a",lineHeight:1.7,fontSize:15}}>{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section style={{padding:"100px 48px",background:"#fff"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:64}}>
            <span style={{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:sage}}>Depoimentos</span>
            <h2 style={{fontSize:42,fontWeight:700,color:green,marginTop:12,fontStyle:"italic"}}>O que dizem</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>
            {c.testimonials.map((t,i)=>(
              <div key={i} style={{background:cream,borderRadius:20,padding:32,border:`1px solid ${sage}33`}}>
                <div style={{color:terra,fontSize:32,marginBottom:16}}>❝</div>
                <p style={{fontSize:15,color:"#5a5a4a",lineHeight:1.8,marginBottom:20,fontStyle:"italic"}}>{t.text}</p>
                <p style={{fontWeight:700,fontSize:14,color:green}}>{t.name}</p>
                <p style={{fontSize:13,color:sage,marginTop:4}}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"100px 48px",background:`${cream}`,textAlign:"center",borderTop:`3px solid ${green}`}}>
        <div style={{fontSize:48,marginBottom:24}}>🌿</div>
        <h2 style={{fontSize:42,fontWeight:700,color:green,fontStyle:"italic",marginBottom:16}}>{c.cta_section.headline}</h2>
        <p style={{fontSize:18,color:"#5a5a4a",marginBottom:48,maxWidth:480,margin:"0 auto 48px"}}>{c.cta_section.text}</p>
        <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:green,color:"#fff",padding:"18px 48px",borderRadius:99,fontSize:17,fontWeight:600,textDecoration:"none"}}>{c.cta_section.button} 🌿</a>
      </section>
      <footer style={{background:green,padding:"32px 48px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16,fontSize:13,color:"rgba(255,255,255,0.6)"}}>
        <span style={{color:"#fff",fontWeight:600}}>{name} · {c.contact.city}</span>
        <span>{c.contact.email} · {c.contact.phone}</span>
      </footer>
      <a href={waLink} target="_blank" rel="noreferrer" style={{position:"fixed",bottom:28,right:28,background:"#25d366",color:"#fff",width:56,height:56,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,textDecoration:"none",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",zIndex:999}}>💬</a>
    </div>
  );
}
