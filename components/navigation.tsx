"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ModalCore from "./modalCore";
import { ModalType } from "./modal/modalType";

const Navigation = ({ user }: { user: any | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  if (user === null && pathname?.includes("/profile")) {
    router.push("/");
  }
  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
          >
            Home
          </Link>
        </div>
        <div
          id="navbar-with-mega-menu"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <div>
              <Link className="font-medium text-blue-500" href="/tutorial/">
                tutorial
              </Link>
            </div>
            <div>
              <Link
                className="font-medium text-blue-500"
                href="/startPosts/list"
              >
                Setting
              </Link>
            </div>
            <div>
              <Link
                className="font-medium text-blue-500"
                href="/zstPosts/view/grid"
              >
                post/view
              </Link>
            </div>

            {user ? (
              <>
                <div></div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                      variant="ghost"
                    >
                      {user?.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel> {user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                        href="/profile"
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>◇Settings</DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      ◇Keyboard shortcuts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Link
                        className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                        href="/importdata/selectfile"
                      >
                        CSV-import
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>◇Support</DropdownMenuItem>
                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <form action="/auth/logout" method="post">
                        <button type="submit">logout</button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <div className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                  <ModalCore modalType={ModalType.SignIn}></ModalCore>
                </div>
                <div className="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                  <ModalCore modalType={ModalType.SignUp}></ModalCore>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
