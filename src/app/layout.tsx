import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";


export const metadata: Metadata = {
  title: "StatementX — Bank Statements to Excel in Seconds",
  description:
    "Upload your bank statement PDF and get accurate transactions in Excel or CSV. Fast, secure, and easy to use.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
