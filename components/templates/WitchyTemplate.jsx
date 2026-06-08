"use client";
import { GallerySection } from "./SharedSections";

export default function WitchyTemplate({ site }) {
  const { content, name, profession, logo, gallery, gallery_position, socials, activeSocials, profilePhoto, heroPhotoIndex } = site;
  const c = content;
  const phone = (c.contact?.phone || "").replace(/\D/g, "");
  const waLink = phone ? `https://wa.me/55${phone}?text=${encodeURIComponent(c.contact?.whatsapp_message || "Olá!")}` : null;
  const catalogLink = site.catalogLink || c.contact?.catalog_link || null;
  const waCatalog = catalogLink || (phone ? `https://wa.me/55${phone}?text=${encodeURIComponent("Olá! Gostaria de ver o catálogo completo de serviços.")}` : null);
  const igHandle = (c.contact?.instagram || "").replace("@", "");
  const igLink = igHandle ? `https://instagram.com/${igHandle}` : null;
  const ttHandle = (c.contact?.tiktok || "").replace("@", "");
  const ttLink = ttHandle ? `https://tiktok.com/@${ttHandle}` : null;
  const primaryLink = waLink || igLink || ttLink || "#";
  const heroPhoto = gallery && gallery.length > 0 ? gallery[0] : null;
  const remainingGallery = gallery && gallery.length > 1 ? gallery.slice(1) : [];
  const schema = { "@context": "https://schema.org", "@type": "LocalBusiness", "name": c.seo?.schema_name || name, "description": c.seo?.schema_description || "", "telephone": c.seo?.schema_phone || "" };
  const total = c.services.length;
  const hasOrphan = total % 3 === 1 && total > 3;

  function ServiceCard({ s, full }) {
    const waService = waLink ? `https://wa.me/55${phone}?text=${encodeURIComponent(`Olá! Gostaria de agendar: ${s.title}`)}` : null;
    return (
      <div style={{ padding: full ? "32px 48px" : "40px 32px", border: "1px solid rgba(140,40,120,0.18)", transition: "all 0.3s ease", cursor: "default", display: full ? "flex" : "block", alignItems: full ? "center" : "flex-start", gap: full ? 40 : 0 }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(120,30,100,0.12)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: full ? 24 : 20, fontWeight: 400, color: "#e8c0f0", marginBottom: 10, fontStyle: "italic" }}>{s.title}</h3>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: "rgba(237,224,247,0.55)", lineHeight: 1.85, fontWeight: 300, marginBottom: s.price ? 16 : 0 }}>{s.description}</p>
          {s.price && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, fontWeight: 500, color: "#c080d0" }}>{s.price}</span>
              {waService && (
                <a href={waService} target="_blank" rel="noreferrer" style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "#fff", background: "#7a1f68", padding: "6px 16px", borderRadius: 99, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase" }}>Agendar</a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  function ServicesGrid() {
    if (total <= 3) return (
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${total}, 1fr)`, gap: 2 }}>
        {c.services.map((s, i) => <ServiceCard key={i} s={s} />)}
      </div>
    );
    if (hasOrphan) {
      const main = c.services.slice(0, total - 1);
      const last = c.services[total - 1];
      return (<>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginBottom: 2 }}>
          {main.map((s, i) => <ServiceCard key={i} s={s} />)}
        </div>
        <ServiceCard s={last} full />
      </>);
    }
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {c.services.map((s, i) => <ServiceCard key={i} s={s} />)}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#000000", color: "#ede0f7", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`@keyframes twinkle{0%,100%{opacity:0.1;transform:scale(0.8);}50%{opacity:1;transform:scale(1.2);}}`}</style>
      {[[63.94,2.5,1.1,2.5,5.9,0.77],[89.22,8.69,1.3,1.6,1.7,0.65],[2.65,19.88,1.8,4.0,1.8,0.71],[80.94,0.65,2.1,4.6,2.7,0.41],[95.72,33.66,0.7,1.9,6.8,0.72],[80.71,72.97,1.6,5.9,3.0,0.69],[82.94,61.85,2.2,4.1,5.6,0.33],[22.79,28.94,0.7,2.5,0.8,0.49],[63.57,36.48,1.2,2.4,2.1,0.96],[64.8,60.91,0.8,4.8,1.3,0.57],[98.95,64.0,1.6,4.6,6.7,0.84],[22.9,3.21,1.1,2.7,1.7,0.96],[87.64,31.47,1.8,3.3,7.3,0.62],[26.49,24.66,1.6,2.7,4.7,0.93],[39.94,21.93,2.5,3.8,0.7,0.33],[10.96,62.74,2.1,3.4,0.5,0.57],[99.61,52.91,2.4,5.4,0.1,0.8],[68.17,53.7,1.0,4.4,0.9,0.6],[45.37,95.38,2.3,2.7,4.0,0.43],[91.26,87.05,1.1,4.4,4.9,0.41],[76.25,53.94,2.1,3.9,0.0,0.53],[1.95,92.91,2.3,5.2,2.5,0.34],[87.8,94.69,0.7,3.7,0.6,0.83],[76.58,12.84,1.5,4.0,2.1,0.91],[42.31,21.18,1.6,4.8,1.6,0.52],[99.51,64.99,1.4,3.8,1.0,0.46],[33.81,58.83,1.0,2.5,0.6,0.74],[22.89,90.54,2.2,1.8,1.9,0.77],[21.42,13.23,2.4,4.1,3.8,0.85],[80.75,19.04,0.7,3.4,3.4,0.63],[72.91,67.34,2.5,1.9,3.2,0.54],[86.17,24.87,0.9,3.5,3.4,0.49],[24.98,92.33,1.4,5.4,4.4,0.34],[99.93,83.6,2.4,5.7,6.8,0.42],[48.56,21.37,1.3,1.8,3.0,0.99],[26.52,78.41,1.4,3.4,7.7,1.0],[55.58,71.84,0.8,2.8,7.7,0.71],[54.22,74.8,0.6,4.1,4.0,0.9],[15.74,96.08,0.7,2.3,4.8,0.77],[23.52,11.99,2.3,2.6,4.8,0.73],[41.92,58.37,1.5,5.7,1.6,0.8],[23.87,39.58,1.8,2.8,2.5,0.83],[7.25,45.83,2.5,6.0,0.6,0.45],[26.52,93.33,2.3,5.5,3.0,0.41],[83.37,70.35,1.7,5.9,5.2,0.31],[81.71,29.94,1.8,5.7,1.1,0.38],[10.7,55.32,1.0,4.2,5.7,0.44],[63.42,26.4,1.5,5.6,6.8,0.36],[42.36,27.67,0.5,5.0,5.1,0.48],[74.12,55.17,1.4,1.5,0.6,0.92],[90.39,54.56,2.2,4.1,1.2,0.39],[30.83,89.9,2.1,5.4,7.2,0.45],[24.95,10.28,2.1,5.5,3.3,0.73],[15.46,92.99,2.2,5.9,6.5,0.92],[2.48,73.66,1.2,5.7,6.4,0.9],[81.07,26.68,2.1,2.0,7.0,0.9],[22.24,81.66,1.4,2.9,6.4,0.46],[2.37,19.31,1.2,5.4,7.7,0.5],[64.15,39.97,2.5,3.9,7.5,0.38],[97.04,17.86,2.4,2.7,0.9,0.6],[72.85,31.37,1.7,3.8,3.1,0.7],[25.47,70.88,0.5,5.7,4.3,0.8],[74.2,67.06,1.2,1.8,5.3,0.53],[31.39,84.8,1.9,2.9,2.5,0.59],[40.24,29.57,0.8,3.4,7.5,0.77],[90.28,61.55,1.1,4.0,0.0,0.5],[42.99,58.0,1.8,3.6,3.5,0.45],[47.32,90.12,2.1,2.3,0.7,0.66],[63.29,33.52,2.1,4.9,5.4,0.46],[19.91,2.44,1.0,3.6,6.8,0.35],[41.44,62.98,0.9,4.6,4.0,0.47],[65.61,0.55,2.0,5.0,0.9,0.6],[17.59,95.8,1.5,1.7,2.0,0.89],[45.65,80.14,1.8,5.9,4.8,0.97],[89.14,61.27,1.9,3.8,6.6,0.68],[89.72,74.37,1.4,2.7,2.0,0.75],[76.58,52.13,1.8,2.7,0.6,0.5],[27.17,31.97,1.6,2.1,1.9,0.79],[70.64,6.42,1.3,3.9,3.3,0.44],[42.01,90.48,1.7,4.6,6.9,0.84],[38.04,0.59,1.2,4.9,6.8,0.97],[41.9,74.75,1.6,4.2,1.8,0.45],[43.58,2.9,1.2,4.6,3.2,0.42],[46.74,12.76,1.7,1.6,3.2,0.7],[2.71,64.27,0.8,3.6,0.4,0.57],[21.17,32.68,2.0,3.2,6.0,0.88],[25.23,8.19,0.5,3.9,8.0,0.54],[65.01,78.12,1.8,4.9,7.6,0.44],[2.04,15.24,0.8,4.5,4.5,0.45],[69.95,76.69,0.8,4.2,6.0,0.38],[81.93,96.47,0.7,1.6,2.5,0.77],[95.82,39.67,1.9,1.8,5.5,0.74],[10.19,77.25,2.2,4.2,1.0,0.99],[78.26,34.72,1.4,3.2,4.0,0.54],[84.96,82.23,0.7,5.8,5.1,0.88],[70.73,43.55,2.0,5.8,2.2,0.87],[53.82,48.35,1.4,4.8,2.1,0.9],[83.07,8.67,2.3,2.6,3.7,0.73],[37.9,2.87,2.2,2.3,1.7,0.86],[34.03,88.03,1.9,2.7,0.1,0.96]].map(([x,y,s,d,dl,o],i)=>(<div key={i} style={{position:'fixed',borderRadius:'50%',background:'#fff',width:s,height:s,left:`${x}%`,top:`${y}%`,opacity:o,animation:`twinkle ${d}s ${dl}s ease-in-out infinite`,pointerEvents:'none',zIndex:0}}/>))}<style>{`@keyframes twinkle{0%,100%{opacity:0.1;transform:scale(0.8);}50%{opacity:1;transform:scale(1.2);}}`}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .wt-btn-main:hover{background:#5c1a4a!important;transform:translateY(-2px);box-shadow:0 12px 40px rgba(140,40,120,0.45)!important}
        .wt-social:hover{background:rgba(140,40,120,0.3)!important;border-color:#8c2878!important}
        @media(max-width:768px){
          .wt-hero{grid-template-columns:1fr!important}
          .wt-hero-right{min-height:280px!important}
          .wt-hero-left{padding:100px 28px 60px!important}
          .wt-about{grid-template-columns:1fr!important;gap:40px!important}
          .wt-about-right{border-left:none!important;padding-left:0!important;border-top:1px solid rgba(140,40,120,0.2);padding-top:32px}
          .wt-testi{grid-template-columns:1fr!important}
          .wt-section{padding:60px 24px!important}
          .wt-nav{padding:16px 24px!important}
          .wt-footer{padding:28px 24px!important;flex-direction:column!important;gap:12px!important}
        }
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="wt-nav" style={{ position: "fixed", top: 0, width: "100%", background: "rgba(16,8,24,0.93)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(140,40,120,0.2)", zIndex: 100, padding: "18px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", boxSizing: "border-box" }}>
        {logo ? <img src={logo} alt={name} style={{ height: 38, maxWidth: 160, objectFit: "contain" }} /> : <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, letterSpacing: 2, color: "#e8c0f0" }}>{name}</span>}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {igLink && <a href={igLink} target="_blank" rel="noreferrer" className="wt-social" style={{ color: "#c080d0", fontSize: 18, textDecoration: "none", padding: "8px 12px", border: "1px solid rgba(140,40,120,0.3)", borderRadius: 8, transition: "all 0.2s" }}>📸</a>}
          {ttLink && <a href={ttLink} target="_blank" rel="noreferrer" className="wt-social" style={{ color: "#c080d0", fontSize: 18, textDecoration: "none", padding: "8px 12px", border: "1px solid rgba(140,40,120,0.3)", borderRadius: 8, transition: "all 0.2s" }}>🎵</a>}
          {waLink && <a href={waLink} target="_blank" rel="noreferrer" className="wt-btn-main" style={{ fontFamily: "'Jost',sans-serif", background: "#7a1f68", color: "#fff", padding: "10px 24px", borderRadius: 99, fontSize: 13, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.3s ease" }}>Agendar</a>}
        </div>
      </nav>

      <section className="wt-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh", paddingTop: 76 }}>
        <div className="wt-hero-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 56px" }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#8c2878", marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "#8c2878" }} />{profession}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 300, lineHeight: 1.15, color: "#f0dcff", marginBottom: 16, fontStyle: "italic" }}>{c.hero.headline}</h1>
          {c.hero.starting_price && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: "rgba(192,128,208,0.8)", marginBottom: 20 }}>a partir de <span style={{ color: "#c080d0", fontWeight: 600 }}>{c.hero.starting_price}</span></p>}
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, color: "rgba(237,224,247,0.6)", lineHeight: 1.9, marginBottom: 36, maxWidth: 420, fontWeight: 300 }}>{c.hero.subheadline}</p>
          {c.about?.session_count && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
              {["💜","💜","💜"].map((h,i) => <span key={i} style={{ fontSize: 14 }}>{h}</span>)}
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, color: "rgba(192,128,208,0.7)" }}>{c.about.session_count} realizadas</span>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 44 }}>
            {c.differentials.map((d, i) => (
              <div key={i} style={{ fontFamily: "'Jost',sans-serif", display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "rgba(237,224,247,0.65)", fontWeight: 300 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#8c2878", flexShrink: 0 }} />{d.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={primaryLink} target="_blank" rel="noreferrer" className="wt-btn-main" style={{ fontFamily: "'Jost',sans-serif", display: "inline-block", background: "#7a1f68", color: "#fff", padding: "15px 36px", borderRadius: 99, fontSize: 14, fontWeight: 400, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.3s ease" }}>{c.hero.cta}</a>
            {igLink && <a href={igLink} target="_blank" rel="noreferrer" className="wt-social" style={{ fontFamily: "'Jost',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, color: "#c080d0", padding: "15px 24px", border: "1px solid rgba(140,40,120,0.35)", borderRadius: 99, fontSize: 13, textDecoration: "none", transition: "all 0.2s" }}>📸 Instagram</a>}
            {ttLink && <a href={ttLink} target="_blank" rel="noreferrer" className="wt-social" style={{ fontFamily: "'Jost',sans-serif", display: "inline-flex", alignItems: "center", gap: 8, color: "#c080d0", padding: "15px 24px", border: "1px solid rgba(140,40,120,0.35)", borderRadius: 99, fontSize: 13, textDecoration: "none", transition: "all 0.2s" }}>🎵 TikTok</a>}
          </div>
        </div>
        <div className="wt-hero-right" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(145deg,#1e0a2e 0%,#150520 50%,#1a0818 100%)" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%,rgba(120,30,100,0.3) 0%,transparent 65%)", zIndex: 1 }} />
          {heroPhoto
            ? <img src={heroPhoto} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85, position: "relative", zIndex: 0 }} />
            : logo
              ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", position: "relative", zIndex: 2, padding: 60 }}><img src={logo} alt={name} style={{ maxWidth: "70%", maxHeight: "60%", objectFit: "contain", filter: "brightness(1.1) drop-shadow(0 0 40px rgba(140,40,120,0.5))" }} /></div>
              : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", position: "relative", zIndex: 2 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 120, lineHeight: 1, color: "rgba(140,40,120,0.2)" }}>✦</div>
                    <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "rgba(140,40,120,0.45)", marginTop: 20 }}>{c.contact.is_online ? "Atendimento Online" : c.contact.city}</p>
                  </div>
                </div>
          }
        </div>
      </section>

      <section className="wt-section wt-about" style={{ padding: "100px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", borderTop: "1px solid rgba(140,40,120,0.15)" }}>
        <div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#8c2878", marginBottom: 20 }}>Sobre</p>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 28 }}>
            {profilePhoto && <img src={profilePhoto} alt={name} style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(140,40,120,0.4)", flexShrink: 0 }} />}
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 300, fontStyle: "italic", color: "#f0dcff", lineHeight: 1.2 }}>{name}</h2>
          </div>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, color: "rgba(237,224,247,0.65)", lineHeight: 2, fontWeight: 300, marginBottom: c.about?.session_count ? 20 : 0 }}>{c.about.text}</p>
          {c.about?.session_count && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(140,40,120,0.1)", border: "1px solid rgba(140,40,120,0.25)", borderRadius: 99, padding: "8px 20px", marginTop: 8 }}>
              <span style={{ fontSize: 16 }}>✦</span>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: "#c080d0" }}>{c.about.session_count} realizadas</span>
            </div>
          )}
        </div>
        <div className="wt-about-right" style={{ borderLeft: "1px solid rgba(140,40,120,0.2)", paddingLeft: 56 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 64, color: "rgba(140,40,120,0.2)", lineHeight: 1, marginBottom: -10 }}>❝</div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontStyle: "italic", color: "rgba(237,224,247,0.5)", lineHeight: 1.75, fontWeight: 300 }}>{c.testimonials[0]?.text}</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#8c2878", marginTop: 20 }}>— {c.testimonials[0]?.name}{c.testimonials[0]?.city ? `, ${c.testimonials[0].city}` : ""}</p>
        </div>
      </section>

      {gallery_position === "after_about" && remainingGallery.length > 0 && <GallerySection gallery={remainingGallery} theme="witchy" />}

      <section className="wt-section" style={{ padding: "100px 56px", background: "rgba(100,20,80,0.06)", borderTop: "1px solid rgba(140,40,120,0.15)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 16 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,4vw,50px)", fontWeight: 300, fontStyle: "italic", color: "#f0dcff", display: "flex", alignItems: "center", gap: 16 }}>Principais Serviços <span style={{ color: "#8c2878", fontSize: "0.75em", marginLeft: 8 }}>✦</span></h2>
            <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(90deg,rgba(140,40,120,0.4),transparent)", alignSelf: "center" }} />
          </div>
          <ServicesGrid />
          {waCatalog && (
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <a href={waCatalog} target="_blank" rel="noreferrer" style={{ fontFamily: "'Jost',sans-serif", display: "inline-flex", alignItems: "center", gap: 10, color: "#c080d0", padding: "14px 32px", border: "1px solid rgba(140,40,120,0.35)", borderRadius: 99, fontSize: 13, textDecoration: "none", letterSpacing: 1, transition: "all 0.2s" }}>
                Ver catálogo completo →
              </a>
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: "60px 56px", borderTop: "1px solid rgba(140,40,120,0.1)", textAlign: "center", background: "rgba(140,40,120,0.04)" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(20px,3vw,32px)", fontStyle: "italic", color: "rgba(240,220,255,0.7)", marginBottom: 24, fontWeight: 300 }}>Pronta para começar sua jornada?</p>
        <a href={primaryLink} target="_blank" rel="noreferrer" className="wt-btn-main" style={{ fontFamily: "'Jost',sans-serif", display: "inline-block", background: "transparent", color: "#c080d0", padding: "13px 36px", borderRadius: 99, fontSize: 13, fontWeight: 400, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase", border: "1px solid rgba(140,40,120,0.5)", transition: "all 0.3s ease" }}>{c.hero.cta}</a>
      </section>

      {gallery_position === "after_services" && remainingGallery.length > 0 && <GallerySection gallery={remainingGallery} theme="witchy" />}

      <section className="wt-section" style={{ padding: "100px 56px", borderTop: "1px solid rgba(140,40,120,0.15)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#8c2878", marginBottom: 14, textAlign: "center" }}>Depoimentos</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 300, fontStyle: "italic", color: "#f0dcff", textAlign: "center", marginBottom: 64 }}>Vozes do Universo</h2>
          <div className="wt-testi" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "rgba(140,40,120,0.08)" }}>
            {c.testimonials.map((t, i) => (
              <div key={i} style={{ background: "#000000", padding: "36px 28px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, color: "rgba(140,40,120,0.3)", lineHeight: 1, marginBottom: 4 }}>❝</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontStyle: "italic", color: "rgba(237,224,247,0.65)", lineHeight: 1.85, marginBottom: 24 }}>{t.text}</p>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 13, fontWeight: 500, color: "#e8c0f0" }}>{t.name}</p>
                {t.city && <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "rgba(140,40,120,0.7)", marginTop: 4 }}>{t.city}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {c.faq && c.faq.length > 0 && (
        <section className="wt-section" style={{ padding: "100px 56px", background: "rgba(100,20,80,0.06)", borderTop: "1px solid rgba(140,40,120,0.15)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: "#8c2878", marginBottom: 14, textAlign: "center" }}>Dúvidas</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(26px,4vw,42px)", fontWeight: 300, fontStyle: "italic", color: "#f0dcff", textAlign: "center", marginBottom: 52 }}>Perguntas Frequentes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {c.faq.map((f, i) => (
                <div key={i} style={{ padding: "24px 28px", background: "rgba(140,40,120,0.06)", borderLeft: "2px solid rgba(140,40,120,0.35)" }}>
                  <h3 style={{ fontFamily: "'Jost',sans-serif", fontSize: 15, fontWeight: 500, color: "#e8c0f0", marginBottom: 8 }}>{f.question}</h3>
                  <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 14, color: "rgba(237,224,247,0.55)", lineHeight: 1.8, fontWeight: 300 }}>{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {gallery_position === "before_cta" && remainingGallery.length > 0 && <GallerySection gallery={remainingGallery} theme="witchy" />}

      <section className="wt-section" style={{ padding: "120px 56px", textAlign: "center", borderTop: "1px solid rgba(140,40,120,0.15)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,rgba(120,30,100,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 48, color: "rgba(140,40,120,0.3)", marginBottom: 20 }}>✦</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,5vw,54px)", fontWeight: 300, fontStyle: "italic", color: "#f0dcff", marginBottom: 16, lineHeight: 1.2 }}>{c.cta_section.headline}</h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: 16, color: "rgba(237,224,247,0.5)", maxWidth: 460, margin: "0 auto 48px", fontWeight: 300, lineHeight: 1.8 }}>{c.cta_section.text}</p>
          <a href={primaryLink} target="_blank" rel="noreferrer" className="wt-btn-main" style={{ fontFamily: "'Jost',sans-serif", display: "inline-block", background: "#7a1f68", color: "#fff", padding: "17px 44px", borderRadius: 99, fontSize: 14, fontWeight: 400, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", transition: "all 0.3s ease" }}>{c.cta_section.button}</a>
        </div>
      </section>

      <footer className="wt-footer" style={{ borderTop: "1px solid rgba(140,40,120,0.15)", padding: "32px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontSize: 12, letterSpacing: 1 }}>
        <span style={{ fontFamily: "'Jost',sans-serif", textTransform: "uppercase", letterSpacing: 3, color: "rgba(237,224,247,0.4)" }}>{name}{!c.contact.is_online && c.contact.city ? ` · ${c.contact.city}` : ""}</span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {igLink && <a href={igLink} target="_blank" rel="noreferrer" style={{ fontFamily: "'Jost',sans-serif", color: "rgba(140,40,120,0.5)", textDecoration: "none", fontSize: 13 }}>{c.contact.instagram}</a>}
          {ttLink && <a href={ttLink} target="_blank" rel="noreferrer" style={{ fontFamily: "'Jost',sans-serif", color: "rgba(140,40,120,0.5)", textDecoration: "none", fontSize: 13 }}>{c.contact.tiktok}</a>}
          {c.contact.email && <span style={{ fontFamily: "'Jost',sans-serif", fontSize: 12, color: "rgba(140,40,120,0.4)" }}>{c.contact.email}</span>}
        </div>
      </footer>

      {waLink && (
        <a href={waLink} target="_blank" rel="noreferrer" style={{ position: "fixed", bottom: 28, right: 28, background: "#25d366", color: "#fff", width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", boxShadow: "0 4px 24px rgba(37,211,102,0.4)", zIndex: 999 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}
    </div>
  );
}
