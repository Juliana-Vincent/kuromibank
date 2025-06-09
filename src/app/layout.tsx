import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google'
import PageWrapper from "../../components/AnimationPresence";
import { AuthProvider } from "../../context/AuthContext/page";
import ClientNavWrapper from "../../components/ClientWrapper/ClientWrapper";

export const metadata: Metadata = {
  title: "Kuromibank",
  description: "Webbanking",
};
const nunito = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.className}>
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
