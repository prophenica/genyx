"use client";
import { LogoSection, GallerySection } from "./SharedSections";

export default function MinimalTemplate({ site }) {
  const { content, name, profession, logo, gallery, gallery_position } = site;
  const c = content;
  const phone = (c.contact?.phone || "").replace(/\D/g, "");
  const waLink = `https://wa.me/55${phone}?text=${encodeURIComponent(c.contact?.whatsapp_message || "Olá!")}`;
  const schema = {"@context":"https://schema.org","@type":c.seo?.schema_type||"LocalBusiness","name":c.seo?.schema_name||name,"description":c.seo?.schema_description||"","telephone":c.seo?.schema_phone||""};
  const Gallery = () => <GallerySection gallery={gallery} theme="minimal"/>;
  return (
    <div style={{fontFamily:"'Helvetica Neue',Arial,sans-serif",color:"#111",background:"#fff"}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
      <nav style={{position:"fixed",top:0,width:"100%",background:"rgba(255,255,255,0.95)",backdropFilter:"blur(8px)",borderBottom:"1px solid #eee",zIndex:100,padding:"16px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",boxSizing:"border-box"}}>
        {logo ? <LogoSection logo={logo} name={name}/> : <span style={{fontWeight:700,fontSize:18}}>{name}</span>}
        <a href={waLink} target="_blank" rel="noreferrer" style={{background:"#111",color:"#fff",padding:"10px 22px",borderRadius:6,fontSize:14,textDecoration:"none",fontWeight:500}}>Falar no WhatsApp</a>
      </nav>
      <section style={{paddingTop:120,paddingBottom:100,paddingLeft:40,paddingRight:40,maxWidth:800,margin:"0 auto",textAlign:"center"}}>
        <p style={{fontSize:13,letterSpacing:3,textTransform:"uppercase",color:"#888",marginBottom:20}}>{profession}</p>
        <h1 style={{fontSize:"clamp(32px,6vw,68px)",fontWeight:800,lineHeight:1.1,letterSpacing:-2,marginBottom:24}}>{c.hero.headline}</h1>
        <p style={{fontSize:19,color:"#555",lineHeight:1.7,marginBottom:40,maxWidth:520,margin:"0 auto 40px"}}>{c.hero.subheadline}</p>
        <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#111",color:"#fff",padding:"16px 36px",borderRadius:6,fontSize:16,fontWeight:600,textDecoration:"none"}}>{c.hero.cta} →</a>
      </section>
      <section style={{background:"#f9f9f9",padding:"80px 40px"}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <h2 style={{fontSize:36,fontWeight:800,marginBottom:8,letterSpacing:-1}}>Serviços</h2>
          <div style={{width:40,height:3,background:"#111",marginBottom:48}}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:24}}>
            {c.services.map((s,i)=>(<div key={i} style={{background:"#fff",border:"1px solid #eee",borderRadius:12,padding:32}}><div style={{fontSize:36,marginBottom:16}}>{s.icon}</div><h3 style={{fontSize:20,fontWeight:700,marginBottom:8}}>{s.title}</h3><p style={{color:"#666",lineHeight:1.6,fontSize:15}}>{s.description}</p></div>))}
          </div>
        </div>
      </section>
      {gallery_position==="after_services"&&<Gallery/>}
      <section style={{padding:"80px 40px",maxWidth:800,margin:"0 auto"}}>
        <h2 style={{fontSize:36,fontWeight:800,marginBottom:8,letterSpacing:-1}}>{c.about.title}</h2>
        <div style={{width:40,height:3,background:"#111",marginBottom:32}}/>
        <p style={{fontSize:18,color:"#444",lineHeight:1.8}}>{c.about.text}</p>
        <div style={{marginTop:40,display:"flex",flexWrap:"wrap",gap:12}}>
          {c.differentials.map((d,i)=>(<span key={i} style={{background:"#f2f2f2",borderRadius:99,padding:"8px 18px",fontSize:14}}>{d.icon} {d.text}</span>))}
        </div>
      </section>
      {gallery_position==="after_about"&&<Gallery/>}
      {c.faq&&c.faq.length>0&&(<section style={{background:"#f9f9f9",padding:"80px 40px"}}><div style={{maxWidth:800,margin:"0 auto"}}><h2 style={{fontSize:36,fontWeight:800,marginBottom:48,letterSpacing:-1}}>Perguntas Frequentes</h2><div style={{display:"flex",flexDirection:"column",gap:20}}>{c.faq.map((f,i)=>(<div key={i} style={{background:"#fff",border:"1px solid #eee",borderRadius:12,padding:28}}><h3 style={{fontSize:17,fontWeight:700,marginBottom:10}}>{f.question}</h3><p style={{color:"#555",lineHeight:1.7,fontSize:15}}>{f.answer}</p></div>))}</div></div></section>)}
      <section style={{background:"#fff",padding:"80px 40px"}}><div style={{maxWidth:1000,margin:"0 auto"}}><h2 style={{fontSize:36,fontWeight:800,marginBottom:48,letterSpacing:-1}}>O que dizem os clientes</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>{c.testimonials.map((t,i)=>(<div key={i} style={{background:"#f9f9f9",border:"1px solid #eee",borderRadius:12,padding:28}}><p style={{fontSize:15,color:"#444",lineHeight:1.7,marginBottom:20}}>"{t.text}"</p><p style={{fontWeight:700,fontSize:14}}>{t.name}</p><p style={{fontSize:13,color:"#888"}}>{t.role}</p></div>))}</div></div></section>
      {gallery_position==="before_cta"&&<Gallery/>}
      <section style={{padding:"80px 40px",textAlign:"center",maxWidth:700,margin:"0 auto"}}>
        <h2 style={{fontSize:40,fontWeight:800,letterSpacing:-1,marginBottom:16}}>{c.cta_section.headline}</h2>
        <p style={{fontSize:18,color:"#555",marginBottom:36}}>{c.cta_section.text}</p>
        <a href={waLink} target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#111",color:"#fff",padding:"18px 40px",borderRadius:6,fontSize:17,fontWeight:700,textDecoration:"none"}}>{c.cta_section.button} →</a>
      </section>
      <footer style={{borderTop:"1px solid #eee",padding:"32px 40px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:16,fontSize:14,color:"#888"}}>
        <span>{name} · {c.contact.city}</span><span>{c.contact.email} · {c.contact.phone}</span>
      </footer>
      <a href={waLink} target="_blank" rel="noreferrer" style={{position:"fixed",bottom:28,right:28,background:"#25d366",color:"#fff",width:56,height:56,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,textDecoration:"none",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",zIndex:999}}>💬</a>
    </div>
  );
}
