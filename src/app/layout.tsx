import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "react-hot-toast";

// ===== فونت‌های جدید =====
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Import Vazirmatn از طریق CSS (در globals.css)

export const metadata: Metadata = {
  title: "سایت مقایسه و خرید بلیط هواپیما",
  description: "مقایسه قیمت بلیط پروازهای خارجی بین trip.com و سایت‌های داخلی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${inter.variable}`}>
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
                borderRadius: "16px",
                fontFamily: "var(--font-vazirmatn), sans-serif",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}