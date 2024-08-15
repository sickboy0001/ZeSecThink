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
import {
  CaretDownIcon,
  HamburgerMenuIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import {
  MENUADMINSUBMENU,
  MENULOGIN,
  MENULOGINSUBMENU,
} from "@/constants/navigation";

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
                className=" cursor-pointer"
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
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              {MENULOGIN.map((each, key) => (
                <li className="nav-item" key={key}>
                  <Link
                    className="px-3 py-2  items-center text-xs  font-bold leading-snug hover:opacity-75"
                    href={each.url}
                  >
                    {each.displayName}
                  </Link>
                </li>
              ))}

              {user !== null ? (
                <>
                  <li className="nav-item">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <a className="px-3 py-1  items-center text-xs  font-bold leading-snug  hover:opacity-75">
                          <div className="flex flex-warap items-center  ">
                            {user.username !== undefined ? (
                              <label className="cursor-pointer">
                                {user.username}
                              </label>
                            ) : (
                              <label className="cursor-pointer">nanasi</label>
                            )}
                            <CaretDownIcon className="h-4 w-4" />
                          </div>
                        </a>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className="text-gray-500">
                          {user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="py-0.5" />

                        {MENULOGINSUBMENU.map((each, key) => (
                          <DropdownMenuItem key={key}>
                            <Link
                              className="items-center text-xs  font-bold leading-snug  hover:opacity-75"
                              href={each.url}
                            >
                              {each.displayName}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="py-0.5" />
                        {MENUADMINSUBMENU.map((each, key) => (
                          <DropdownMenuItem key={key}>
                            <Link
                              className="items-center text-xs  font-bold leading-snug  hover:opacity-75"
                              href={each.url}
                            >
                              {each.displayName}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                  <li className="nav-item">
                    <form action="/auth/logout" method="post">
                      <Button
                        className="items-center text-xs  font-bold leading-snug  hover:opacity-75"
                        type="submit"
                        variant="outline"
                        size="icon"
                      >
                        <ExitIcon className="h-4 w-4" />
                      </Button>
                    </form>
                  </li>
                </>
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
