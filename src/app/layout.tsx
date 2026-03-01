import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chefify — AI Cooking Assistant",
  description: "Chat with AI to discover recipes from any cuisine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased transition-colors duration-300 bg-white dark:bg-[#0A0A0F] text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
