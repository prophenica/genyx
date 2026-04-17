import { getSiteBySlug } from "@/lib/db";
import { getTemplate } from "@/components/templates";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const site = getSiteBySlug(params.slug);
  if (!site?.content) return { title: "Site não encontrado" };
  const seo = site.content.seo || {};
  return {
    title: seo.title || site.name,
    description: seo.description || "",
    keywords: seo.keywords?.join(", ") || "",
    openGraph: {
      title: seo.og_title || seo.title || site.name,
      description: seo.og_description || seo.description || "",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: seo.og_title || site.name,
      description: seo.og_description || "",
    },
    robots: { index: true, follow: true },
  };
}

export default function SitePage({ params }) {
  const site = getSiteBySlug(params.slug);
  if (!site) return notFound();
  if (site.status === "pending") return <Status icon="⏳" title="Aguardando pagamento" text="Conclua o pagamento para ativar o site." color="#f97316"/>;
  if (site.status === "generating") return <Status icon="⚙️" title="Gerando seu site..." text="A IA está criando o conteúdo. Recarregue em breve." color="#6366f1" refresh/>;
  if (site.status === "failed") return <Status icon="❌" title="Erro na geração" text="Ocorreu um problema. Entre em contato com o suporte." color="#ef4444"/>;
  if (!site.content) return notFound();
  const Template = getTemplate(site.theme);
  return <Template site={site} />;
}

function Status({ icon, title, text, color, refresh }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {refresh && <meta httpEquiv="refresh" content="10"/>}
        <style>{`*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0f;color:#f1f1f1;font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh}.c{text-align:center;padding:48px 32px}.i{font-size:64px;margin-bottom:24px}h1{font-size:26px;font-weight:700;margin-bottom:12px;color:${color}}p{color:#888;line-height:1.7}`}</style>
      </head>
      <body>
        <div className="c">
          <div className="i">{icon}</div>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </body>
    </html>
  );
}
