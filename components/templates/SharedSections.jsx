"use client";

export function GallerySection({ gallery, theme }) {
  if (!gallery || gallery.length === 0) return null;
  const isDark = theme === "dark" || theme === "witchy" || theme === "bold";
  const bg = isDark ? "#0c0916" : "#f5f5f0";
  const single = gallery.length === 1;
  const double = gallery.length === 2;

  return (
    <section style={{ padding: "0", background: bg, overflow: "hidden" }}>
      {single && (
        <div style={{ width: "100%", maxHeight: 520, overflow: "hidden" }}>
          <img src={gallery[0]} alt="Foto" style={{ width: "100%", height: 520, objectFit: "cover", display: "block" }} />
        </div>
      )}
      {double && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {gallery.map((src, i) => (
            <div key={i} style={{ height: 400, overflow: "hidden" }}>
              <img src={src} alt={`Foto ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      )}
      {!single && !double && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2 }}>
          {gallery.map((src, i) => (
            <div key={i} style={{ height: 300, overflow: "hidden" }}>
              <img src={src} alt={`Foto ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
