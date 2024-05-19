"use client";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/themeprovider";
import Header from "@/components/header";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentPath = usePathname();
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Toaster />
          <div className={clsx({ "pt-32 lg:pt-36": currentPath !== "/" })}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
