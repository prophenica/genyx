import "./globals.css";
export const metadata = { title: "Genixy — Crie seu site profissional com IA", description: "Crie seu site profissional em minutos com inteligência artificial." };
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VCF5EWBJ1D"></script>
        <script dangerouslySetInnerHTML={{__html:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VCF5EWBJ1D');
        `}}/>
      </head>
      <body>{children}</body>
    </html>
  );
}
