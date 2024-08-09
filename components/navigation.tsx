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
import { User } from "@/app/types/user";
import { useState } from "react";
import { CaretDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const Navigation = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  if (user === null && pathname?.includes("/profile")) {
    router.push("/");
  }
  // console.log("const Navigation:", user, user !== null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  "
              href="/"
            >
              ZeroSecondThinking
            </a>
            <div className="lg:hidden">
              <Button
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
                variant="outline"
                size="icon"
              >
                <HamburgerMenuIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2  items-center text-xs  font-bold leading-snug hover:opacity-75"
                  href="/tutorial/"
                >
                  tutorial
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2  items-center text-xs  font-bold leading-snug hover:opacity-75"
                  href="/startPosts/list"
                >
                  Setting
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2  items-center text-xs  font-bold leading-snug  hover:opacity-75"
                  href="/zstPosts/view/grid"
                >
                  post
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2  items-center text-xs  font-bold leading-snug  hover:opacity-75"
                  href="/zstPosts/summary/week"
                >
                  Summary
                </a>
              </li>
              <li className="nav-item"></li>
              {user !== null ? (
                <li className="nav-item">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <a className="px-3 py-1  items-center text-xs  font-bold leading-snug  hover:opacity-75">
                        <div className="flex flex-warap items-center">
                          {user.username !== undefined ? (
                            <label>{user.username}</label>
                          ) : (
                            <label>nanasi</label>
                          )}
                          <CaretDownIcon className="h-4 w-4" />
                        </div>
                      </a>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel className="text-gray-500">
                        {user.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <a
                          className="items-center text-xs  font-bold leading-snug  hover:opacity-75"
                          href="/profile/edit"
                        >
                          Edit
                        </a>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <a
                          className="items-center text-xs  font-bold leading-snug  hover:opacity-75"
                          href="/importdata/selectfile"
                        >
                          CSV-import
                        </a>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Link
                          className="items-center text-xs  font-bold leading-snug  hover:opacity-75"
                          href="/test/textanalyse"
                        >
                          test-API-TextAnalyse
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          className="items-center text-xs  font-bold leading-snug  hover:opacity-75"
                          href="/test/storagetest"
                        >
                          Supabase Storage Test
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <form action="/auth/logout" method="post">
                          <button type="submit">logout</button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <ModalCore modalType={ModalType.SignIn}></ModalCore>
                  </li>
                  <li className="nav-item">
                    <ModalCore modalType={ModalType.SignUp}></ModalCore>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex justify-center w-full ">
        user.userid:{user?.id} {user?.userid}:{user?.username}
      </div>
    </>
  );
};

export default Navigation;
