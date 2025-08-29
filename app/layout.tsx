import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "./_context/UserContext";

export const metadata: Metadata = {
  title: "TicketRu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <UserProvider>
          {children}
          <Toaster richColors position="top-right" />
        </UserProvider>
      </body>
    </html>
  );
}
