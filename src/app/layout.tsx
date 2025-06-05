import type { Metadata } from "next";
import "./globals.css";
import PageWrapper from "../../components/AnimationPresence";
import { AuthProvider } from "../../context/AuthContext/page";
import dynamic from 'next/dynamic';
import Nav from "../../components/Nav/Nav";
import ClientNavWrapper from "../../components/ClientWrapper/ClientWrapper";

export const metadata: Metadata = {
  title: "Kuromibank",
  description: "Webbanking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <PageWrapper>
            <ClientNavWrapper />
            {children}
          </PageWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
