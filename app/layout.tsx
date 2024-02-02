import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "./_components/footer";
import { AuthProvider } from "./_providers/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSW Project",
  description: "Project developed in the full stack week minicourse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
