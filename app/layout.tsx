import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify",
  description: "Listen to Spotify",
};
export const revalidate=0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const userSongs = await getSongsByUserId(); 
  return (
    <html lang="en">
      <head> 
        <link rel="icon" href="/icon.png" className="w-32 h-32"/>
      </head>
      <body className={font.className}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
          <ModalProvider />
            <Sidebar songs={userSongs}>{children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider></body>
    </html>
  );
}
