import type { Metadata } from "next";
import { Nunito, Hind_Guntur, Tienne } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./api/auth/AuthContext";
import SideNav from "./components/SideNav";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const hindGuntur = Hind_Guntur({
  variable: "--font-hind-guntur",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const tienne = Tienne({
  variable: "--font-tienne",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Study At Cal",
  description: "Find your next UC Berkeley study spot!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${hindGuntur.variable} ${tienne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#185FA5]">
        <AuthProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
