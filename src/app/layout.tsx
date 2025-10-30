import type { Metadata } from "next";

import { AuthProvider, StylesProvider } from "@/components/providers";
import { UserStoreInit } from "@/context/user";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
        <NuqsAdapter>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <StylesProvider>
              <UserStoreInit>{children}</UserStoreInit>
            </StylesProvider>
          </body>
        </NuqsAdapter>
      </html>
    </AuthProvider>
  );
}
