"use client";
import { useState, useRef } from "react";
import { TEMPLATES, getTemplate } from "@/components/templates";
import BeamsBackground from "@/components/BeamsBackground";

const TONS=[{id:"profissional",label:"Sério e profissional",icon:"👔"},{id:"amigavel",label:"Amigável e próximo",icon:"😊"},{id:"luxo",label:"Luxo e exclusividade",icon:"✨"},{id:"descontraido",label:"Jovem e descontraído",icon:"��"}];
const AUDIENCES=[{id:"jovens",label:"Jovens (18–30)",icon:"🧑"},{id:"adultos",label:"Adultos (30–50)",icon:"👨‍💼"},{id:"familias",label:"Famílias",icon:"👨‍👩‍👧"},{id:"empresas",label:"Empresas / B2B",icon:"🏢"},{id:"todos",label:"Público geral",icon:"🌎"}];
const GALLERY_POSITIONS=[{id:"after_services",label:"Após os serviços"},{id:"after_about",label:"Após o sobre"},{id:"before_cta",label:"Antes do botão final"}];
const SOCIALS=[{id:"whatsapp",label:"WhatsApp",icon:"💬",placeholder:"(11) 99999-0000"},{id:"instagram",label:"Instagram",icon:"📸",placeholder:"@seuperfil"},{id:"tiktok",label:"TikTok",icon:"🎵",placeholder:"@seuperfil"},{id:"facebook",label:"Facebook",icon:"👥",placeholder:"facebook.com/suapagina"},{id:"email",label:"E-mail",icon:"✉️",placeholder:"seu@email.com"}];

const GF = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Syne:wght@400;500;600&display=swap');`;

const S={
  page:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 16px",fontFamily:"'Jost',system-ui,sans-serif"},
  card:{maxWidth:580,width:"100%"},
  inp:{display:"block",width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(140,40,120,0.3)",borderRadius:10,padding:"13px 16px",color:"#f0dcff",fontSize:15,fontFamily:"'Jost',system-ui,sans-serif",marginBottom:12,boxSizing:"border-box"},
  lbl:{display:"block",color:"rgba(200,160,220,0.7)",fontSize:12,marginBottom:6,marginTop:12,letterSpacing:2,textTransform:"uppercase"},
  btn:{background:"linear-gradient(135deg,#7a1f68,#8c2878)",color:"#fff",border:"none",borderRadius:99,padding:"16px 40px",fontSize:14,fontWeight:400,width:"100%",marginTop:16,fontFamily:"'Jost',system-ui,sans-serif",cursor:"pointer",letterSpacing:2,textTransform:"uppercase"},
  ob:(a)=>({background:a?"rgba(140,40,120,0.15)":"rgba(255,255,255,0.03)",border:a?"1.5px solid rgba(140,40,120,0.6)":"1px solid rgba(140,40,120,0.2)",borderRadius:12,padding:"14px 10px",color:a?"#f0dcff":"rgba(200,160,220,0.5)",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,fontSize:13,fontFamily:"'Jost',system-ui,sans-serif"}),
  obRow:(a)=>({background:a?"rgba(140,40,120,0.15)":"rgba(255,255,255,0.03)",border:a?"1.5px solid rgba(140,40,120,0.6)":"1px solid rgba(140,40,120,0.2)",borderRadius:10,padding:"12px 16px",color:a?"#f0dcff":"rgba(200,160,220,0.5)",cursor:"pointer",display:"flex",alignItems:"center",gap:10,fontSize:14,fontFamily:"'Jost',system-ui,sans-serif",width:"100%",textAlign:"left"}),
  uploadBox:(active)=>({border:`1px dashed ${active?"rgba(140,40,120,0.8)":"rgba(140,40,120,0.25)"}`,borderRadius:12,padding:"20px 16px",textAlign:"center",cursor:"pointer",background:"rgba(255,255,255,0.02)",marginBottom:12}),
};

function toBase64(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file);});}

function Landing({onStart}){
  return(
    <BeamsBackground>
      <style>{GF}</style>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",textAlign:"center"}}>
        <p style={{fontFamily:"'Syne',sans-serif",fontSize:11,letterSpacing:5,textTransform:"uppercase",color:"rgba(180,120,200,0.7)",marginBottom:32}}>✦ Powered by IA</p>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(42px,8vw,88px)",fontWeight:300,fontStyle:"italic",color:"#f0dcff",lineHeight:1.1,marginBottom:24,maxWidth:700}}>
          Seu site nasce hoje
        </h1>
        <p style={{fontFamily:"'Syne',sans-serif",fontSize:16,color:"rgba(200,160,220,0.6)",maxWidth:420,lineHeight:1.8,fontWeight:300,marginBottom:48}}>
          Responda algumas perguntas e nossa IA cria um site completo, elegante e pronto pra atrair a atenção que você merece.
        </p>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,marginBottom:48}}>
          <button onClick={onStart} style={{fontFamily:"'Syne',sans-serif",background:"linear-gradient(135deg,#7a1f68,#8c2878)",color:"#fff",border:"none",borderRadius:99,padding:"18px 52px",fontSize:14,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontWeight:400}}>
            Criar meu site
          </button>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:12,color:"rgba(140,40,120,0.6)",letterSpacing:1}}>R$ 197 · pagamento único · sem mensalidade</p>
        </div>
        <div style={{display:"flex",gap:40,flexWrap:"wrap",justifyContent:"center"}}>
          {["✦ Site completo em minutos","✦ Design exclusivo por IA","✦ Sem mensalidade"].map(t=>(
            <span key={t} style={{fontFamily:"'Syne',sans-serif",fontSize:12,color:"rgba(180,120,200,0.4)",letterSpacing:1}}>{t}</span>
          ))}
        </div>
      </div>
    </BeamsBackground>
  );
}

function Step1({onNext}){
  const nameRef=useRef();const profRef=useRef();const cityRef=useRef();const yearsRef=useRef();
  const [businessType,setBusinessType]=useState("");
  const [locationType,setLocationType]=useState("");
  const [logo,setLogo]=useState(null);
  const [profilePhoto,setProfilePhoto]=useState(null);

  async function handle(){
    const v={name:nameRef.current.value,profession:profRef.current.value,city:cityRef.current.value,businessType,locationType,yearsActive:yearsRef.current.value};
    if(!v.name||!v.profession||!v.city){alert("Preencha os campos obrigatórios");return;}
    if(logo){v.logo=await toBase64(logo);}
    if(profilePhoto){v.profilePhoto=await toBase64(profilePhoto);}
    onNext(v);
  }

  return(
    <BeamsBackground>
      <style>{GF}</style>
      <div style={S.page}><div style={S.card}>
        <p style={{fontFamily:"'Syne',sans-serif",fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(140,40,120,0.7)",marginBottom:20}}>Passo 1 de 3</p>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(28px,5vw,42px)",fontWeight:300,fontStyle:"italic",color:"#f0dcff",marginBottom:28,lineHeight:1.2}}>Sobre você</h2>

        <label style={S.lbl}>Nome do negócio ou seu nome *</label>
        <input ref={nameRef} style={S.inp} placeholder="Ex: Studio Bella, Dra. Ana Lima..." defaultValue=""/>
        <label style={S.lbl}>Profissão ou tipo de negócio *</label>
        <input ref={profRef} style={S.inp} placeholder="Ex: Tarólogo, Terapeuta Holística..." defaultValue=""/>
        <label style={S.lbl}>Cidade *</label>
        <input ref={cityRef} style={S.inp} placeholder="Ex: São Paulo - SP" defaultValue=""/>
        <label style={S.lbl}>Há quanto tempo você atende? <span style={{opacity:0.4}}>(opcional)</span></label>
        <input ref={yearsRef} style={S.inp} placeholder="Ex: 2 anos, 6 meses..." defaultValue=""/>

        <label style={{...S.lbl,marginTop:20}}>Você é...</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
          <button style={S.ob(businessType==="solo")} onClick={()=>setBusinessType("solo")}><span style={{fontSize:28}}>🧑</span><span>Profissional solo</span></button>
          <button style={S.ob(businessType==="business")} onClick={()=>setBusinessType("business")}><span style={{fontSize:28}}>🏢</span><span>Empresa / equipe</span></button>
        </div>

        <label style={{...S.lbl,marginTop:20}}>Seu negócio é...</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
          <button style={S.ob(locationType==="online")} onClick={()=>setLocationType("online")}><span style={{fontSize:28}}>🌐</span><span>100% Online</span></button>
          <button style={S.ob(locationType==="physical")} onClick={()=>setLocationType("physical")}><span style={{fontSize:28}}>📍</span><span>Presencial</span></button>
        </div>
        <button style={{...S.ob(locationType==="hybrid"),marginTop:8,width:"100%"}} onClick={()=>setLocationType("hybrid")}><span style={{fontSize:24}}>🔀</span><span>Híbrido</span></button>

        <label style={{...S.lbl,marginTop:20}}>Foto de perfil <span style={{opacity:0.4}}>(aparece no Sobre)</span></label>
        <div style={S.uploadBox(!!profilePhoto)} onClick={()=>document.getElementById("profile-inp").click()}>
          {profilePhoto?<><div style={{fontSize:28}}>✅</div><p style={{color:"#c080d0",fontSize:14}}>{profilePhoto.name}</p></>:<><div style={{fontSize:28}}>🤳</div><p style={{color:"rgba(200,160,220,0.5)",fontSize:14}}>Sua foto de perfil</p><p style={{color:"rgba(140,40,120,0.4)",fontSize:12}}>Aparece ao lado do texto Sobre você</p></>}
        </div>
        <input id="profile-inp" type="file" accept="image/png,image/jpeg,image/jpg,image/webp" style={{display:"none"}} onChange={e=>setProfilePhoto(e.target.files[0]||null)}/>

        <label style={S.lbl}>Logo <span style={{opacity:0.4}}>(opcional)</span></label>
        <div style={S.uploadBox(!!logo)} onClick={()=>document.getElementById("logo-inp").click()}>
          {logo?<><div style={{fontSize:28}}>✅</div><p style={{color:"#c080d0",fontSize:14}}>{logo.name}</p></>:<><div style={{fontSize:28}}>🖼️</div><p style={{color:"rgba(200,160,220,0.5)",fontSize:14}}>Upload da logo</p></>}
        </div>
        <input id="logo-inp" type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp" style={{display:"none"}} onChange={e=>setLogo(e.target.files[0]||null)}/>

        <button style={S.btn} onClick={handle}>Próximo →</button>
      </div></div>
    </BeamsBackground>
  );
}

function Step2({onNext,onBack,formData}){
  const difRef=useRef();const extraRef=useRef();const addressRef=useRef();
  const aboutRef=useRef();const catalogRef=useRef();
  const [photos,setPhotos]=useState([]);
  const [galleryPos,setGalleryPos]=useState("after_services");
  const [sessionCount,setSessionCount]=useState("");
  const [useEstimate,setUseEstimate]=useState(false);
  const [heroPhotoIndex,setHeroPhotoIndex]=useState(0);
  const [photoUrls,setPhotoUrls]=useState([]);
  const [services,setServices]=useState([{name:"",price:"",description:""},{name:"",price:"",description:""},{name:"",price:"",description:""}]);

  function updateService(i,field,val){setServices(prev=>{const n=[...prev];n[i]={...n[i],[field]:val};return n;});}

  function handlePhotoAdd(e){
    const newFiles=Array.from(e.target.files);
    setPhotos(p=>{const combined=[...p,...newFiles].slice(0,8);setPhotoUrls(combined.map(f=>URL.createObjectURL(f)));return combined;});
  }

  function removePhoto(i){
    setPhotos(p=>{const n=p.filter((_,j)=>j!==i);setPhotoUrls(n.map(f=>URL.createObjectURL(f)));if(heroPhotoIndex>=n.length)setHeroPhotoIndex(0);return n;});
  }

  const serviceLabels=[{namePh:"Serviço entry — menor valor",pricePh:"Ex: R$80"},{namePh:"Serviço carro-chefe — mais vendido ⭐",pricePh:"Ex: R$150"},{namePh:"Serviço premium — maior valor",pricePh:"Ex: R$300"}];

  async function handle(){
    const v={services:services.filter(s=>s.name).map(s=>s.name).join("\n"),servicesData:services.filter(s=>s.name),diferencial:difRef.current.value,extra:extraRef.current?.value||"",address:addressRef.current?.value||"",sessionCount:useEstimate?"estimate":sessionCount,aboutText:aboutRef.current?.value||"",catalogLink:catalogRef.current?.value||"",heroPhotoIndex};
    if(!v.services||!v.diferencial){alert("Preencha pelo menos 1 serviço e seu diferencial");return;}
    if(photos.length>0){const b64=await Promise.all(photos.map(f=>toBase64(f)));v.gallery=b64;v.gallery_position=galleryPos;}
    onNext(v);
  }

  return(
    <BeamsBackground>
      <style>{GF}</style>
      <div style={S.page}><div style={S.card}>
        <button onClick={onBack} style={{background:"none",border:"1px solid rgba(140,40,120,0.3)",borderRadius:99,color:"rgba(200,160,220,0.5)",padding:"8px 18px",fontSize:12,cursor:"pointer",marginBottom:24,letterSpacing:1,fontFamily:"'Syne',sans-serif"}}>← Voltar</button>
        <p style={{fontFamily:"'Syne',sans-serif",fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(140,40,120,0.7)",marginBottom:12}}>Passo 2 de 3</p>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(26px,4vw,38px)",fontWeight:300,fontStyle:"italic",color:"#f0dcff",marginBottom:24,lineHeight:1.2}}>Serviços e sobre você</h2>

        {services.map((s,i)=>(
          <div key={i} style={{background:"rgba(140,40,120,0.06)",border:"1px solid rgba(140,40,120,0.2)",borderRadius:12,padding:16,marginBottom:12}}>
            <p style={{color:"rgba(140,40,120,0.7)",fontSize:10,fontWeight:500,letterSpacing:2,textTransform:"uppercase",marginBottom:10,fontFamily:"'Syne',sans-serif"}}>{serviceLabels[i].namePh}</p>
            <input style={{...S.inp,marginBottom:8}} placeholder="Nome do serviço" value={s.name} onChange={e=>updateService(i,"name",e.target.value)}/>
            <input style={{...S.inp,marginBottom:8}} placeholder={serviceLabels[i].pricePh} value={s.price} onChange={e=>updateService(i,"price",e.target.value)}/>
            <textarea style={{...S.inp,height:60,resize:"vertical",marginBottom:0}} placeholder="Descrição opcional..." value={s.description} onChange={e=>updateService(i,"description",e.target.value)}/>
          </div>
        ))}

        <label style={S.lbl}>Seu maior diferencial *</label>
        <textarea ref={difRef} style={{...S.inp,height:80,resize:"vertical"}} placeholder="Ex: 8 anos de experiência, método exclusivo..." defaultValue=""/>

        <label style={S.lbl}>Sobre você <span style={{opacity:0.4}}>(deixe em branco para a IA gerar)</span></label>
        <textarea ref={aboutRef} style={{...S.inp,height:100,resize:"vertical"}} placeholder="Sua história, missão... ou deixe em branco." defaultValue=""/>

        <label style={S.lbl}>Link do catálogo completo <span style={{opacity:0.4}}>(opcional)</span></label>
        <input ref={catalogRef} style={S.inp} placeholder="WhatsApp Business, Hotmart, Notion..." defaultValue=""/>
        <p style={{color:"rgba(140,40,120,0.4)",fontSize:11,marginTop:-8,marginBottom:12,fontFamily:"'Syne',sans-serif"}}>Aparece como botão abaixo dos serviços</p>

        <label style={S.lbl}>Atendimentos realizados <span style={{opacity:0.4}}>(opcional)</span></label>
        <div style={{display:"flex",gap:8,marginBottom:12,alignItems:"center"}}>
          <input style={{...S.inp,marginBottom:0,flex:1}} placeholder="Ex: 200, 500..." value={sessionCount} onChange={e=>{setSessionCount(e.target.value);setUseEstimate(false);}} disabled={useEstimate}/>
          <button onClick={()=>{setUseEstimate(p=>!p);if(!useEstimate)setSessionCount("");}} style={{...S.obRow(useEstimate),width:"auto",whiteSpace:"nowrap",padding:"12px 16px",flexShrink:0}}>
            {useEstimate?"✅":"🤖"} Estimar
          </button>
        </div>

        {formData?.locationType!=="online"&&<>
          <label style={S.lbl}>Endereço ou região <span style={{opacity:0.4}}>(opcional)</span></label>
          <input ref={addressRef} style={S.inp} placeholder="Ex: Pinheiros, SP" defaultValue=""/>
        </>}

        <label style={S.lbl}>Informações extras <span style={{opacity:0.4}}>(opcional)</span></label>
        <textarea ref={extraRef} style={{...S.inp,height:70,resize:"vertical"}} placeholder="Horário, promoção, frase especial..." defaultValue=""/>

        <label style={{...S.lbl,marginTop:16}}>Fotos do trabalho <span style={{opacity:0.4}}>(até 8)</span></label>
        <div style={S.uploadBox(photos.length>0)} onClick={()=>document.getElementById("photos-inp").click()}>
          {photos.length>0?<><div style={{fontSize:24}}>📸</div><p style={{color:"#c080d0",fontSize:14}}>{photos.length} foto{photos.length>1?"s":""} adicionada{photos.length>1?"s":""}</p><p style={{color:"rgba(140,40,120,0.4)",fontSize:12}}>Clique para adicionar mais</p></>:<><div style={{fontSize:28}}>📸</div><p style={{color:"rgba(200,160,220,0.5)",fontSize:14}}>Fotos do seu trabalho</p></>}
        </div>
        <input id="photos-inp" type="file" accept="image/*" multiple style={{display:"none"}} onChange={handlePhotoAdd}/>

        {photos.length>0&&<>
          <label style={{...S.lbl,marginBottom:10}}>Foto do hero <span style={{opacity:0.4}}>(primeira foto da página)</span></label>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:16}}>
            {photoUrls.map((url,i)=>(
              <div key={i} style={{position:"relative",cursor:"pointer",borderRadius:8,overflow:"hidden",border:heroPhotoIndex===i?"2px solid rgba(140,40,120,0.8)":"2px solid rgba(140,40,120,0.2)"}} onClick={()=>setHeroPhotoIndex(i)}>
                <img src={url} style={{width:"100%",height:72,objectFit:"cover",display:"block"}}/>
                {heroPhotoIndex===i&&<div style={{position:"absolute",top:4,right:4,background:"#7a1f68",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff",fontWeight:700}}>✓</div>}
                <button onClick={e=>{e.stopPropagation();removePhoto(i);}} style={{position:"absolute",top:4,left:4,background:"rgba(0,0,0,0.6)",border:"none",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fff",cursor:"pointer"}}>×</button>
              </div>
            ))}
          </div>

          <label style={S.lbl}>Posição da galeria</label>
          {GALLERY_POSITIONS.map(p=>(
            <button key={p.id} style={{...S.obRow(galleryPos===p.id),marginBottom:6}} onClick={()=>setGalleryPos(p.id)}>
              <span>{galleryPos===p.id?"◉":"○"}</span>{p.label}
            </button>
          ))}
        </>}

        <button style={S.btn} onClick={handle}>Próximo →</button>
      </div></div>
    </BeamsBackground>
  );
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
  return(
    <BeamsBackground>
      <style>{GF}</style>
      <div style={S.page}><div style={S.card}>
        <button onClick={onBack} style={{background:"none",border:"1px solid rgba(140,40,120,0.3)",borderRadius:99,color:"rgba(200,160,220,0.5)",padding:"8px 18px",fontSize:12,cursor:"pointer",marginBottom:24,letterSpacing:1,fontFamily:"'Syne',sans-serif"}}>← Voltar</button>
        <p style={{fontFamily:"'Syne',sans-serif",fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(140,40,120,0.7)",marginBottom:12}}>Passo 3 de 3</p>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(26px,4vw,38px)",fontWeight:300,fontStyle:"italic",color:"#f0dcff",marginBottom:24,lineHeight:1.2}}>Estilo e contato</h2>

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
              <span style={{fontSize:10,opacity:0.4}}>{t.desc}</span>
            </button>
          ))}
        </div>

        <label style={{...S.lbl,marginBottom:10}}>Redes sociais</label>
        {SOCIALS.map(s=>(
          <div key={s.id} style={{marginBottom:8}}>
            <button style={{...S.obRow(activeSocials.includes(s.id)),marginBottom:activeSocials.includes(s.id)?6:0}} onClick={()=>toggleSocial(s.id)}>
              <span style={{fontSize:18}}>{s.icon}</span><span>{s.label}</span>
              <span style={{marginLeft:"auto",fontSize:18}}>{activeSocials.includes(s.id)?"✅":"○"}</span>
            </button>
            {activeSocials.includes(s.id)&&(
              <input style={{...S.inp,marginBottom:0}} placeholder={s.placeholder} value={socials[s.id]} onChange={e=>setSocials(p=>({...p,[s.id]:e.target.value}))}/>
            )}
          </div>
        ))}

        <button style={{...S.btn,marginTop:20}} onClick={handle}>✦ Gerar meu site</button>
      </div></div>
    </BeamsBackground>
  );
}

export default function Home(){
  const [step,setStep]=useState(0);
  const [data,setData]=useState({});
  const [preview,setPreview]=useState(null);
  const [loading,setLoading]=useState(false);
  const [loadingCO,setLoadingCO]=useState(false);
  const [error,setError]=useState("");

  async function handleStep3(s3){
    const form={...data,...s3};
    setData(form);setLoading(true);setError("");setStep(3);
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
      delete formToSend.logo;delete formToSend.gallery;delete formToSend.profilePhoto;
      const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(formToSend)});
      const d=await res.json();
      if(d.error)throw new Error(d.error);
      window.location.href=d.url;
    }catch(e){setError(e.message);setLoadingCO(false);}
  }

  if(step===0)return <Landing onStart={()=>setStep(1)}/>;
  if(step===1)return <Step1 onNext={v=>{setData(v);setStep(2);}}/>;
  if(step===2)return <Step2 formData={data} onNext={v=>{setData(p=>({...p,...v}));setStep(3);}} onBack={()=>setStep(1)}/>;
  if(step===3)return(
    <BeamsBackground>
      <style>{GF}</style>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,fontFamily:"'Syne',sans-serif"}}>
        {loading&&<><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:64,color:"rgba(140,40,120,0.6)"}}>✦</div><p style={{color:"#c080d0",fontSize:16,letterSpacing:2,textTransform:"uppercase"}}>Conjurando seu site...</p><p style={{color:"rgba(140,40,120,0.5)",fontSize:13,letterSpacing:1}}>Isso pode levar até 1 minuto</p></>}
        {!loading&&<Step3 onNext={handleStep3} onBack={()=>setStep(2)}/>}
        {error&&<div style={{position:"fixed",bottom:20,left:20,right:20,background:"rgba(120,10,40,0.9)",border:"1px solid rgba(180,40,80,0.5)",borderRadius:8,padding:"12px 16px",color:"#fca5a5",fontSize:14}}>⚠️ {error}</div>}
      </div>
    </BeamsBackground>
  );

  if(step===4&&preview){
    const TemplateComp=getTemplate(preview.theme);
    const fakesite={name:preview.form.name,profession:preview.form.profession,content:preview.content,theme:preview.theme,logo:preview.form.logo,gallery:preview.form.gallery,gallery_position:preview.form.gallery_position,profilePhoto:preview.form.profilePhoto,heroPhotoIndex:preview.form.heroPhotoIndex||0,socials:preview.form.socials,activeSocials:preview.form.activeSocials,servicesData:preview.form.servicesData,catalogLink:preview.form.catalogLink||""};
    return(
      <div style={{minHeight:"100vh",background:"#0a0208"}}>
        <div style={{background:"rgba(10,2,8,0.95)",borderBottom:"1px solid rgba(140,40,120,0.2)",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,position:"sticky",top:0,zIndex:200,fontFamily:"'Syne',sans-serif"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{color:"#c080d0",fontWeight:500,letterSpacing:1,fontSize:13}}>✦ Prévia</span>
            {preview.form.logo&&<span style={{background:"rgba(140,40,120,0.1)",border:"1px solid rgba(140,40,120,0.3)",borderRadius:99,padding:"2px 10px",fontSize:11,color:"#c080d0"}}>✅ Logo</span>}
            {preview.form.profilePhoto&&<span style={{background:"rgba(140,40,120,0.1)",border:"1px solid rgba(140,40,120,0.3)",borderRadius:99,padding:"2px 10px",fontSize:11,color:"#c080d0"}}>🤳 Foto</span>}
            {preview.form.gallery&&<span style={{background:"rgba(140,40,120,0.1)",border:"1px solid rgba(140,40,120,0.3)",borderRadius:99,padding:"2px 10px",fontSize:11,color:"#c080d0"}}>📸 {preview.form.gallery.length} fotos</span>}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button style={{background:"none",border:"1px solid rgba(140,40,120,0.3)",borderRadius:99,color:"rgba(200,160,220,0.5)",padding:"8px 16px",cursor:"pointer",fontSize:12,letterSpacing:1}} onClick={()=>setStep(2)}>← Editar</button>
            <button style={{background:"linear-gradient(135deg,#7a1f68,#8c2878)",color:"#fff",border:"none",borderRadius:99,padding:"8px 24px",cursor:"pointer",fontSize:13,letterSpacing:1,opacity:loadingCO?0.7:1}} disabled={loadingCO} onClick={goCheckout}>{loadingCO?"Aguarde...":"✦ Publicar por R$197"}</button>
          </div>
        </div>
        {error&&<div style={{background:"rgba(120,10,40,0.9)",color:"#fca5a5",padding:"10px 20px",fontSize:14,fontFamily:"'Syne',sans-serif"}}>⚠️ {error}</div>}
        <TemplateComp site={fakesite}/>
      </div>
    );
  }
  return null;
}
