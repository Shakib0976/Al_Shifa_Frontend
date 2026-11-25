import Navbar from "@/components/layout/navbar";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Preloader from "@/components/loader/preLoader";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Al-Shifa Animal Science",
  description: "Animal food and nutrition products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body
        className={`${openSans.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <Preloader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
