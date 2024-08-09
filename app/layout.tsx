import { GeistSans } from "geist/font/sans";
import "./globals.css";
import SupabaseListener from "@/components/supabaseListener";
import { getUtilUser } from "./actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "./types/user";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ZeroSecondThinking",
  description: "ZeroSecondThinking",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUtilUser();

  return (
    <html lang="ja" className={GeistSans.className}>
      <body className="">
        <UserProvider user={user as User}>
          <div>
            <SupabaseListener />
          </div>
          <main className="container mx-auto px-2 py-2min-h-screen flex flex-col items-center ">
            <div>
              {/* <article className="bg-gray-200 sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200">
              test
              {children}
            </article> */}
              {children}
            </div>
          </main>
          {/* <footer className="w-full border-t border-t-foreground/10 p-4 flex justify-center text-center text-xs">
          <p>footer</p>
        </footer> */}
        </UserProvider>
      </body>
    </html>
  );
}
