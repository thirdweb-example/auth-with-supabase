import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "thirdweb Auth with Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <ThirdwebProvider>{children}</ThirdwebProvider>
        </main>
      </body>
    </html>
  );
}
