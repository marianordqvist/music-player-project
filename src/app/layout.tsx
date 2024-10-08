import type { Metadata } from "next";
import { Inter, Open_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./utils/ReduxProvider";
import Header from "./components/Header";

const jakarta = Plus_Jakarta_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Tune.in Music Player",
  description: "A website to discover new artists and music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <Header />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
