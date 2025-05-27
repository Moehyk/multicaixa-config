import type { Metadata } from "next";

import { RootWrapper, PageWrapper } from "@/components/wrappers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider, StylesProvider } from "@/components/providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

import { geistMono, geistSans } from "@/utils";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCX-Config App",
  description: "Aplicação de Configuração do Multicaíxa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <StylesProvider>
            <RootWrapper>
              <Header />
              <PageWrapper>{children}</PageWrapper>
              <Footer />
            </RootWrapper>
          </StylesProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
