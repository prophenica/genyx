"use client";
import { useState, useRef } from "react";
import { TEMPLATES, getTemplate } from "@/components/templates";

const TONS=[{id:"profissional",label:"Sério e profissional",icon:"👔"},{id:"amigavel",label:"Amigável e próximo",icon:"😊"},{id:"luxo",label:"Luxo e exclusividade",icon:"✨"},{id:"descontraido",label:"Jovem e descontraído",icon:"🎉"}];
const AUDIENCES=[{id:"jovens",label:"Jovens (18–30)",icon:"🧑"},{id:"adultos",label:"Adultos (30–50)",icon:"👨‍💼"},{id:"familias",label:"Famílias",icon:"👨‍👩‍👧"},{id:"empresas",label:"Empresas / B2B",icon:"🏢"},{id:"todos",label:"Público geral",icon:"🌎"}];
const GALLERY_POSITIONS=[{id:"after_services",label:"Após os serviços"},{id:"after_about",label:"Após o sobre"},{id:"before_cta",label:"Antes do botão final"}];
const SOCIALS=[{id:"whatsapp",label:"WhatsApp",icon:"💬",placeholder:"(11) 99999-0000"},{id:"instagram",label:"Instagram",icon:"📸",placeholder:"@seuperfil"},{id:"tiktok",label:"TikTok",icon:"🎵",placeholder:"@seuperfil"},{id:"facebook",label:"Facebook",icon:"👥",placeholder:"facebook.com/suapagina"},{id:"email",label:"E-mail",icon:"✉️",placeholder:"seu@email.com"}];

const S={
  page:{minHeight:"100vh",background:"#0a0a0f",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 16px",fontFamily:"system-ui,sans-serif"},
  card:{maxWidth:580,width:"100%"},
  inp:{display:"block",width:"100%",background:"#111",border:"1px solid #2a2a3a",borderRadius:10,padding:"13px 16px",color:"#fff",fontSize:16,fontFamily:"system-ui,sans-serif",marginBottom:12,boxSizing:"border-box"},
  lbl:{display:"block",color:"#aaa",fontSize:13,marginBottom:6,marginTop:12},
  btn:{background:"linear-gradient(135deg,#f97316,#fb923c)",color:"#fff",border:"none",borderRadius:14,padding:"16px 40px",fontSize:16,fontWeight:600,width:"100%",marginTop:16,fontFamily:"system-ui,sans-serif",cursor:"pointer"},
  ob:(a)=>({background:a?"rgba(249,115,22,0.12)":"#111",border:a?"1.5px solid #f97316":"1px solid #2a2a3a",borderRadius:12,padding:"14px 10px",color:a?"#fff":"#aaa",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,fontSize:13,fontFamily:"system-ui,sans-serif"}),
  obRow:(a)=>({background:a?"rgba(249,115,22,0.12)":"#111",border:a?"1.5px solid #f97316":"1px solid #2a2a3a",borderRadius:10,padding:"12px 16px",color:a?"#fff":"#aaa",cursor:"pointer",display:"flex",alignItems:"center",gap:10,fontSize:14,fontFamily:"system-ui,sans-serif",width:"100%",textAlign:"left"}),
  uploadBox:(active)=>({border:`2px dashed ${active?"#f97316":"#2a2a3a"}`,borderRadius:12,padding:"20px 16px",textAlign:"center",cursor:"pointer",background:"#111",marginBottom:12}),
};

function toBase64(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});}

function Step1({onNext}){
  const nameRef=useRef();const profRef=useRef();const cityRef=useRef();
  const [businessType,setBusinessType]=useState("");
  const [locationType,setLocationType]=useState("");
  const [logo,setLogo]=useState(null);
  async function handle(){
    const v={name:nameRef.current.value,profession:profRef.current.value,city:cityRef.current.value,businessType,locationType};
    if(!v.name||!v.profession||!v.city){alert("Preencha os campos obrigatórios");return;}
    if(logo){v.logo=await toBase64(logo);}
    onNext(v);
  }
  return <div style={S.page}><div style={S.card}>
    <div style={{display:"inline-block",background:"rgba(249,115,22,0.12)",border:"1px solid rgba(249,115,22,0.3)",borderRadius:99,padding:"5px 16px",fontSize:13,color:"#fb923c",marginBottom:24}}>✦ Criador de Sites com IA</div>
    <h1 style={{fontSize:"clamp(26px,5vw,42px)",fontWeight:800,lineHeight:1.2,marginBottom:12,color:"#f1f1f1"}}>Seu site profissional<br/><span style={{color:"#f97316"}}>em minutos</span></h1>
    <p style={{color:"#777",fontSize:15,lineHeight:1.7,marginBottom:28}}>Responda algumas perguntas e nossa IA cria um site completo e personalizado.</p>

    <label style={S.lbl}>Nome do negócio ou seu nome *</label>
    <input ref={nameRef} style={S.inp} placeholder="Ex: Studio Bella, Dr. Rafael Lima..." defaultValue=""/>

    <label style={S.lbl}>Profissão ou tipo de negócio *</label>
    <input ref={profRef} style={S.inp} placeholder="Ex: Tarólogo, Nutricionista, Loja de roupas..." defaultValue=""/>

    <label style={S.lbl}>Cidade *</label>
    <input ref={cityRef} style={S.inp} placeholder="Ex: São Paulo - SP" defaultValue=""/>

    <label style={{...S.lbl,marginTop:20}}>Você é... *</label>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
      <button style={S.ob(businessType==="solo")} onClick={()=>setBusinessType("solo")}>
        <span style={{fontSize:28}}>🧑</span><span>Profissional solo</span><span style={{fontSize:11,color:"#666"}}>Eu mesmo atendo</span>
      </button>
      <button style={S.ob(businessType==="business")} onClick={()=>setBusinessType("business")}>
        <span style={{fontSize:28}}>��</span><span>Empresa / equipe</span><span style={{fontSize:11,color:"#666"}}>Temos uma equipe</span>
      </button>
    </div>

    <label style={{...S.lbl,marginTop:20}}>Seu negócio é... *</label>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
      <button style={S.ob(locationType==="online")} onClick={()=>setLocationType("online")}>
        <span style={{fontSize:28}}>🌐</span><span>100% Online</span><span style={{fontSize:11,color:"#666"}}>Atendo remotamente</span>
      </button>
      <button style={S.ob(locationType==="physical")} onClick={()=>setLocationType("physical")}>
        <span style={{fontSize:28}}>📍</span><span>Presencial</span><span style={{fontSize:11,color:"#666"}}>Tenho espaço físico</span>
      </button>
    </div>
    {locationType===""&&<div style={{display:"grid",gridTemplateColumns:"1fr",marginTop:0}}>
      <button style={{...S.ob(locationType==="hybrid"),marginTop:0}} onClick={()=>setLocationType("hybrid")}>
        <span style={{fontSize:24}}>🔀</span><span>Híbrido (online + presencial)</span>
      </button>
    </div>}
    {locationType!=""&&locationType==="hybrid"&&<button style={{...S.ob(true),marginTop:8,width:"100%"}} onClick={()=>setLocationType("hybrid")}>
      <span style={{fontSize:24}}>🔀</span><span>Híbrido (online + presencial)</span>
    </button>}
    {locationType===""&&null}
    {locationType!==""&&locationType!=="hybrid"&&<button style={{...S.ob(locationType==="hybrid"),marginTop:8,width:"100%"}} onClick={()=>setLocationType("hybrid")}>
      <span style={{fontSize:24}}>🔀</span><span>Híbrido (online + presencial)</span>
    </button>}

    <label style={{...S.lbl,marginTop:20}}>Logo <span style={{color:"#555"}}>(opcional)</span></label>
    <div style={S.uploadBox(!!logo)} onClick={()=>document.getElementById("logo-inp").click()}>
      {logo?<><div style={{fontSize:28,marginBottom:6}}>✅</div><p style={{color:"#f97316",fontSize:14}}>{logo.name}</p><p style={{color:"#555",fontSize:12}}>Clique para trocar</p></>:<><div style={{fontSize:28,marginBottom:6}}>🖼️</div><p style={{color:"#aaa",fontSize:14}}>Upload da logo</p><p style={{color:"#555",fontSize:12}}>PNG, JPG ou SVG</p></>}
    </div>
    <input id="logo-inp" type="file" accept="image/*" style={{display:"none"}} onChange={e=>setLogo(e.target.files[0]||null)}/>

    <button style={S.btn} onClick={handle}>Próximo →</button>
  </div></div>;
}

function Step2({onNext,onBack}){
  const servRef=useRef();const difRef=useRef();const extraRef=useRef();
  const [address,setAddress]=useState("");
  const [photos,setPhotos]=useState([]);
  const [galleryPos,setGalleryPos]=useState("after_services");
  const locationType=window.__locationType||"online";
  async function handle(){
    const v={services:servRef.current.value,diferencial:difRef.current.value,extra:extraRef.current.value,address};
    if(!v.services||!v.diferencial){alert("Preencha os campos obrigatórios");return;}
    if(photos.length>0){
      const b64=await Promise.all(photos.map(f=>toBase64(f)));
      v.gallery=b64;v.gallery_position=galleryPos;
    }
    onNext(v);
  }
  return <div style={S.page}><div style={S.card}>
    <button onClick={onBack} style={{background:"none",border:"1px solid #2a2a3a",borderRadius:8,color:"#888",padding:"8px 14px",fontSize:13,cursor:"pointer",marginBottom:24}}>← Voltar</button>
    <p style={{color:"#f97316",fontSize:13,fontWeight:600,marginBottom:8}}>Passo 2 de 3</p>
    <h2 style={{fontSize:22,fontWeight:700,marginBottom:20,color:"#f1f1f1"}}>Serviços e diferenciais</h2>

    <label style={S.lbl}>Seus principais serviços ou produtos *</label>
    <textarea ref={servRef} style={{...S.inp,height:100,resize:"vertical"}} placeholder={"1. Leitura de tarot\n2. Ritual personalizado\n3. Consultoria espiritual"} defaultValue=""/>

    <label style={S.lbl}>Seu maior diferencial *</label>
    <textarea ref={difRef} style={{...S.inp,height:80,resize:"vertical"}} placeholder="Ex: 8 anos de experiência, método exclusivo..." defaultValue=""/>

    <label style={S.lbl}>Endereço ou região de atendimento <span style={{color:"#555"}}>(opcional)</span></label>
    <input style={S.inp} placeholder="Ex: Pinheiros, SP — Rua X, 123" value={address} onChange={e=>setAddress(e.target.value)}/>

    <label style={S.lbl}>Informações extras <span style={{color:"#555"}}>(opcional)</span></label>
    <textarea ref={extraRef} style={{...S.inp,height:70,resize:"vertical"}} placeholder="Horário, promoção, frase especial..." defaultValue=""/>

    <label style={{...S.lbl,marginTop:16}}>Fotos do trabalho <span style={{color:"#555"}}>(opcional — até 8)</span></label>
    <div style={S.uploadBox(photos.length>0)} onClick={()=>document.getElementById("photos-inp").click()}>
      {photos.length>0?<><div style={{fontSize:24,marginBottom:4}}>📸</div><p style={{color:"#f97316",fontSize:14}}>{photos.length} foto{photos.length>1?"s":""} adicionada{photos.length>1?"s":""}</p><p style={{color:"#555",fontSize:12}}>Clique para adicionar mais</p></>:<><div style={{fontSize:28,marginBottom:6}}>📸</div><p style={{color:"#aaa",fontSize:14}}>Adicionar fotos do seu trabalho</p><p style={{color:"#555",fontSize:12}}>Aparecem em galeria no site</p></>}
    </div>
    <input id="photos-inp" type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>setPhotos(p=>[...p,...Array.from(e.target.files)].slice(0,8))}/>

    {photos.length>0&&<>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
        {photos.map((f,i)=>(
          <span key={i} style={{background:"#1a1a2e",border:"1px solid #2a2a3a",borderRadius:6,padding:"4px 10px",fontSize:12,color:"#aaa",display:"flex",alignItems:"center",gap:6}}>
            📷 {f.name.slice(0,18)}
            <button onClick={()=>setPhotos(p=>p.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:"#ef4444",cursor:"pointer",padding:0,fontSize:14}}>×</button>
          </span>
        ))}
      </div>
      <label style={S.lbl}>Onde aparece a galeria?</label>
      {GALLERY_POSITIONS.map(p=>(
        <button key={p.id} style={{...S.obRow(galleryPos===p.id),marginBottom:6}} onClick={()=>setGalleryPos(p.id)}>
          <span>{galleryPos===p.id?"🔵":"⚪"}</span>{p.label}
        </button>
      ))}
    </>}
    <button style={S.btn} onClick={handle}>Próximo →</button>
  </div></div>;
}

function Step3({onNext,onBack}){
  const [tone,setTone]=useState("");
  const [audience,setAudience]=useState("");
  const [theme,setTheme]=useState("");
  const [socials,setSocials]=useState({whatsapp:"",instagram:"",tiktok:"",facebook:"",email:""});
  const [activeSocials,setActiveSocials]=useState(["whatsapp"]);
  function toggleSocial(id){setActiveSocials(p=>p.includes(id)?p.filter(s=>s!==id):[...p,id]);}
  function handle(){
    if(!tone||!audience){alert("Selecione o tom e o público");return;}
    if(activeSocials.includes("whatsapp")&&!socials.whatsapp){alert("Preencha o número do WhatsApp");return;}
    onNext({tone,audience,theme,socials,activeSocials});
  }
  return <div style={S.page}><div style={S.card}>
    <button onClick={onBack} style={{background:"none",border:"1px solid #2a2a3a",borderRadius:8,color:"#888",padding:"8px 14px",fontSize:13,cursor:"pointer",marginBottom:24}}>← Voltar</button>
    <p style={{color:"#f97316",fontSize:13,fontWeight:600,marginBottom:8}}>Passo 3 de 3</p>
    <h2 style={{fontSize:22,fontWeight:700,marginBottom:20,color:"#f1f1f1"}}>Estilo e contato</h2>

    <label style={{...S.lbl,marginBottom:10}}>Tom de comunicação *</label>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
      {TONS.map(t=><button key={t.id} style={S.ob(tone===t.label)} onClick={()=>setTone(t.label)}><span style={{fontSize:26}}>{t.icon}</span><span style={{fontSize:12}}>{t.label}</span></button>)}
    </div>

    <label style={{...S.lbl,marginBottom:10}}>Público principal *</label>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
      {AUDIENCES.map(a=><button key={a.id} style={S.ob(audience===a.label)} onClick={()=>setAudience(a.label)}><span style={{fontSize:22}}>{a.icon}</span><span style={{fontSize:11}}>{a.label}</span></button>)}
    </div>

    <label style={{...S.lbl,marginBottom:10}}>Visual do site</label>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
      {[{id:"",label:"🤖 Auto",desc:"IA escolhe"},...Object.entries(TEMPLATES).map(([id,t])=>({id,label:`${t.preview} ${t.label}`,desc:t.desc}))].map(t=>(
        <button key={t.id} style={S.ob(theme===t.id)} onClick={()=>setTheme(t.id)}>
          <span style={{fontSize:18}}>{t.label.split(" ")[0]}</span>
          <span style={{fontSize:10,textAlign:"center",lineHeight:1.3}}>{t.label.split(" ").slice(1).join(" ")}</span>
          <span style={{fontSize:10,color:"#555"}}>{t.desc}</span>
        </button>
      ))}
    </div>

    <label style={{...S.lbl,marginBottom:10}}>Redes sociais — selecione as que você usa</label>
    {SOCIALS.map(s=>(
      <div key={s.id} style={{marginBottom:8}}>
        <button style={{...S.obRow(activeSocials.includes(s.id)),marginBottom:activeSocials.includes(s.id)?6:0}} onClick={()=>toggleSocial(s.id)}>
          <span style={{fontSize:18}}>{s.icon}</span>
          <span>{s.label}</span>
          <span style={{marginLeft:"auto",fontSize:18}}>{activeSocials.includes(s.id)?"✅":"○"}</span>
        </button>
        {activeSocials.includes(s.id)&&(
          <input style={{...S.inp,marginBottom:0,marginTop:0}} placeholder={s.placeholder} value={socials[s.id]} onChange={e=>setSocials(p=>({...p,[s.id]:e.target.value}))}/>
        )}
      </div>
    ))}

    <button style={{...S.btn,marginTop:20}} onClick={handle}>✨ Gerar prévia do site</button>
  </div></div>;
}

export default function Home(){
  const [step,setStep]=useState(1);
  const [data,setData]=useState({});
  const [preview,setPreview]=useState(null);
  const [loading,setLoading]=useState(false);
  const [loadingCO,setLoadingCO]=useState(false);
  const [error,setError]=useState("");

  async function handleStep3(s3){
    const form={...data,...s3};
    setData(form);
    setLoading(true);setError("");
    setStep(3);
    try{
      const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const d=await res.json();
      if(d.error)throw new Error(d.error);
      setPreview({content:d.content,theme:d.theme,form});
      setStep(4);
    }catch(e){setError(e.message);setStep(3);}
    finally{setLoading(false);}
  }

  async function goCheckout(){
    setLoadingCO(true);setError("");
    try{
      const formToSend={...preview.form,theme:preview.theme};
      delete formToSend.logo;delete formToSend.gallery;
      const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(formToSend)});
      const d=await res.json();
      if(d.error)throw new Error(d.error);
      window.location.href=d.url;
    }catch(e){setError(e.message);setLoadingCO(false);}
  }

  if(step===1)return <Step1 onNext={v=>{setData(v);setStep(2);}}/>;
  if(step===2)return <Step2 onNext={v=>{setData(p=>({...p,...v}));setStep(3);}} onBack={()=>setStep(1)}/>;
  if(step===3)return(
    <div style={{...S.page,flexDirection:"column",gap:16}}>
      {loading&&<><div style={{fontSize:56}}>⚙️</div><p style={{color:"#f97316",fontSize:18,fontFamily:"system-ui"}}>Gerando seu site...</p><p style={{color:"#555",fontSize:14,fontFamily:"system-ui"}}>Isso pode levar até 1 minuto</p></>}
      {!loading&&<Step3 onNext={handleStep3} onBack={()=>setStep(2)}/>}
      {error&&<div style={{position:"fixed",bottom:20,left:20,right:20,background:"#2a1010",border:"1px solid #7f1d1d",borderRadius:8,padding:"12px 16px",color:"#fca5a5",fontSize:14,fontFamily:"system-ui"}}>⚠️ {error}</div>}
    </div>
  );

  if(step===4&&preview){
    const TemplateComp=getTemplate(preview.theme);
    const fakesite={name:preview.form.name,profession:preview.form.profession,content:preview.content,theme:preview.theme,logo:preview.form.logo,gallery:preview.form.gallery,gallery_position:preview.form.gallery_position,socials:preview.form.socials,activeSocials:preview.form.activeSocials};
    return <div style={{minHeight:"100vh",background:"#0a0a0f"}}>
      <div style={{background:"#0f0f1a",borderBottom:"1px solid #1a1a2e",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,position:"sticky",top:0,zIndex:200,fontFamily:"system-ui"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
          <span style={{color:"#f97316",fontWeight:700}}>👀 Prévia</span>
          {preview.form.logo&&<span style={{background:"#111",border:"1px solid #2a2a3a",borderRadius:99,padding:"2px 10px",fontSize:11,color:"#f97316"}}>✅ Logo</span>}
          {preview.form.gallery&&<span style={{background:"#111",border:"1px solid #2a2a3a",borderRadius:99,padding:"2px 10px",fontSize:11,color:"#6366f1"}}>📸 {preview.form.gallery.length} fotos</span>}
        </div>
        <div style={{display:"flex",gap:10}}>
          <button style={{background:"none",border:"1px solid #2a2a3a",borderRadius:8,color:"#888",padding:"8px 16px",cursor:"pointer",fontSize:13}} onClick={()=>setStep(2)}>← Editar</button>
          <button style={{background:"linear-gradient(135deg,#f97316,#fb923c)",color:"#fff",border:"none",borderRadius:8,padding:"8px 20px",cursor:"pointer",fontSize:14,fontWeight:600,opacity:loadingCO?0.7:1}} disabled={loadingCO} onClick={goCheckout}>{loadingCO?"Aguarde...":"💳 Publicar por R$197"}</button>
        </div>
      </div>
      {error&&<div style={{background:"#2a1010",color:"#fca5a5",padding:"10px 20px",fontSize:14,fontFamily:"system-ui"}}>⚠️ {error}</div>}
      <TemplateComp site={fakesite}/>
    </div>;
  }
  return null;
}
