import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { PortalDataProvider } from "@/context/PortalDataContext";

export const metadata: Metadata = {
  title: "Qatar Sports Club — Management & Administration Portal | نادي قطر الرياضي",
  description:
    "Official institutional leadership showcase and private executive governance portal of Qatar Sports Club (The Kings), Doha, Qatar.",
  icons: {
    icon: "/QSC-Emblem-RGB.svg",
    apple: "/QSC-Emblem-RGB.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#F7F7F4] text-[#171717] antialiased">
        <LanguageProvider>
          <AuthProvider>
            <PortalDataProvider>{children}</PortalDataProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
