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
          "bg-gray-50 dark:bg-black relative min-h-screen flex flex-col text-body text-xs"
        )}
      >
        <Providers>
          <div className="items-center top-4 left-4 absolute flex gap-x-4 ">
            <ThemeToggle />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
