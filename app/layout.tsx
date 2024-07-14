import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SupabaseListener from "@/components/supabaseListener";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div>
          <SupabaseListener />
        </div>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <footer className="w-full border-t border-t-foreground/10 p-4 flex justify-center text-center text-xs">
          <p>footer</p>
        </footer>
      </body>
    </html>
  );
}
