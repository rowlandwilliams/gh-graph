import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from "classnames";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rowland Williams",
  description: "Design Technologist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "bg-gray-50 dark:bg-zinc-900 min-h-screen flex flex-col text-body text-xs"
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
