import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import LocalBusinessSchema from "@/shared/seo/LocalBusinessSchema";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Albirena Abogados | Elite Defense Architecture",
    template: "%s | Albirena Abogados"
  },
  description: "Firma de abogados de alto nivel especializado en blindaje jurídico corporativo, defensa laboral integral y estrategias de prevención empresarial en Perú.",
  keywords: ["Abogados laborales", "Estudio jurídico corporativo", "Defensa laboral", "Albirena Abogados", "Asesoría legal empresas", "Blindaje corporativo", "Derecho corporativo", "Auditoría SUNAFIL"],
  authors: [{ name: "Albirena Abogados" }],
  creator: "Albirena Abogados",
  publisher: "Albirena Abogados",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://albirenaabogados.pe"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Albirena Abogados | Estrategia Legal Premium",
    description: "Defensa jurídica excepcional y auditoría corporativa para empresas y altos perfiles.",
    url: 'https://albirenaabogados.pe',
    siteName: 'Albirena Abogados',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Albirena Abogados",
    description: "Su victoria legal comienza ahora. Estrategias de blindaje laboral.",
    creator: '@albirenaabogados',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full bg-brand-bg text-brand-white selection:bg-brand-primary/30">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
