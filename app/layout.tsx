import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import AppNavbar from "@/components/navbar";
import BootstrapClient from "@/components/BootstrapClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Next.js Mahasiswa",
  description: "Project untuk memenuhi tugas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>
        <AppNavbar />
        <main>
          {children}
        </main>
        {/* Impor Bootstrap JS di sisi client */}
        <BootstrapClient /> 
      </body>
    </html>
  );
}