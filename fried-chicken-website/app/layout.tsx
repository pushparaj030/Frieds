import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fried Chickens | Hot & Crispy Fried Chicken",
  description:
    "Fresh, crunchy, and delicious fried chicken delivered fast. Order now on WhatsApp!",
  keywords: "fried chicken, crispy chicken, chicken delivery, food, Bangalore",
  openGraph: {
    title: "Fried Chickens | Hot & Crispy Fried Chicken",
    description: "Fresh, crunchy, and delicious fried chicken delivered fast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <CartProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
