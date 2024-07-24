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
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const Navigation = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  const router = useRouter();
  if (user === null && pathname?.includes("/profile")) {
    router.push("/");
  }

  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap  "
              href="/"
            >
              ZeroSecondThinking
            </a>
            <Button
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
              variant="outline"
              size="icon"
            >
              <HamburgerMenuIcon className="h-5 w-5" />
            </Button>
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
                  className="px-3 py-2 flex items-center text-xs  font-bold leading-snug hover:opacity-75"
                  href="/tutorial/"
                >
                  tutorial
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs  font-bold leading-snug hover:opacity-75"
                  href="/startPosts/list"
                >
                  Setting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs  font-bold leading-snug  hover:opacity-75"
                  href="/zstPosts/view/grid"
                >
                  post/view
                </Link>
              </li>
              <li>
                {user ? (
                  <>
                    <div></div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="font-medium text-blue-500  hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                          variant="ghost"
                        >
                          {user.username}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel> {user.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link
                            className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                            href="/profile/edit"
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>◇Settings</DropdownMenuItem>
                        <DropdownMenuItem disabled>
                          ◇Keyboard shortcuts
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <Link
                            className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
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
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.SignIn}></ModalCore>
                    </div>
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.SignUp}></ModalCore>
                    </div>
                    <ModalCore modalType={ModalType.UserEdit}></ModalCore>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <>
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.SignIn}></ModalCore>
                    </div>
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.SignUp}></ModalCore>
                    </div>
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.UserEdit}></ModalCore>
                    </div>
                  </> */}

      {/* <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="px-4 md:px-0 flex justify-between items-center">
            <div>
              <a
                className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                href="/"
              >
                ZeroSecondThinking
              </a>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="hs-collapse-toggle flex justify-center items-center size-6 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                id="hs-navbar-header-floating-collapse"
                aria-expanded="false"
                aria-controls="hs-navbar-header-floating"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-navbar-header-floating"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <svg
                  className="hs-collapse-open:hidden shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div
              id="hs-navbar-header-floating"
              className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
              aria-labelledby="hs-navbar-header-floating-collapse"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                <Link className="font-medium text-blue-500" href="/tutorial/">
                  tutorial
                </Link>
                <Link
                  className="font-medium text-blue-500"
                  href="/startPosts/list"
                >
                  Setting
                </Link>
                <Link
                  className="font-medium text-blue-500"
                  href="/zstPosts/view/grid"
                >
                  post/view
                </Link>

                {user ? (
                  <>
                    <div></div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="font-medium text-blue-500  hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                          variant="ghost"
                        >
                          {user.username}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel> {user.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link
                            className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                            href="/profile/edit"
                          >
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>◇Settings</DropdownMenuItem>
                        <DropdownMenuItem disabled>
                          ◇Keyboard shortcuts
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <Link
                            className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
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
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.SignIn}></ModalCore>
                    </div>
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.SignUp}></ModalCore>
                    </div>
                    <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                      <ModalCore modalType={ModalType.UserEdit}></ModalCore>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header> */}
      {/* <!-- ========== END HEADER ========== --> */}
      {/* <!-- ========== HEADER ========== --> */}
      {/* <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex justify-between items-center gap-x-1">
            <Link
              className="flex-none text-xl font-semibold dark:text-white"
              href="/"
            >
              ZeroSecondThinking
            </Link>
            <button
              type="button"
              className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              id="hs-header-base-collapse"
              aria-expanded="false"
              aria-controls="hs-header-base"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-header-base"
            >
              <svg
                className="hs-collapse-open:hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block shrink-0 hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
          <div
            id="navbar-with-mega-menu"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <Link className="font-medium text-blue-500" href="/tutorial/">
                tutorial
              </Link>
              <Link
                className="font-medium text-blue-500"
                href="/startPosts/list"
              >
                Setting
              </Link>
              <Link
                className="font-medium text-blue-500"
                href="/zstPosts/view/grid"
              >
                post/view
              </Link>

              {user ? (
                <>
                  <div></div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="font-medium text-blue-500  hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                        variant="ghost"
                      >
                        {user.username}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel> {user.email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link
                          className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                          href="/profile/edit"
                        >
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>◇Settings</DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        ◇Keyboard shortcuts
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Link
                          className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
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
                  <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                    <ModalCore modalType={ModalType.SignIn}></ModalCore>
                  </div>
                  <div className="font-medium text-blue-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500">
                    <ModalCore modalType={ModalType.SignUp}></ModalCore>
                  </div>
                  <ModalCore modalType={ModalType.UserEdit}></ModalCore>
                </>
              )}
            </div>
          </div>
        </nav>
      </header> */}
    </>
  );
};

export default Navigation;
