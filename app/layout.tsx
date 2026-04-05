import type { Metadata } from "next";
import { 
  Cormorant_Garamond, Inter, Playfair_Display, 
  Montserrat, Lato, Roboto, Fira_Code 
} from "next/font/google";
import "./globals.css";

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

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-accent",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-clean",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Legal-Scan Pro | Albirena Abogados",
  description: "Blindaje Jurídico y Defensa Laboral de alto nivel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} ${playfair.variable} ${montserrat.variable} ${lato.variable} ${roboto.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy-deep text-white selection:bg-gold/30">
        <main className="flex-grow">{children}</main>
        {/* Footer could go here */}
      </body>
    </html>
  );
}

