import Navbar from "@/components/layout/navbar";
import "./globals.css";

export const metadata = {
  title: "Al-Shifa Animal Science",
  description: "Animal food and nutrition products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
