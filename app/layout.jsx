import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import Head from 'next/head';

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrainsMono'
});

export const metadata = {
  title: "Teodor Todorov | Web Developer Portfolio",
  description: "Explore the portfolio of Teodor Todorov, a full-stack web developer specializing in modern, responsive web applications. View services, skills, and contact information.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={jetbrainsMono.className}>
        <Header />
        <PageTransition>{children}</PageTransition>
        <StairTransition></StairTransition>
      </body>
    </html>
  );
}
