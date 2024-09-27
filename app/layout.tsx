import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "goodstore",
  description: "편안한 쇼핑되세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col h-full bg-white text-black">
        <CartProvider>
          <Header />
          <Suspense fallback={"loading"}>
            <div className="flex-1 ">{children}</div>
          </Suspense>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
