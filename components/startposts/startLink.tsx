import React from "react";
import { MENULOGIN } from "@/constants/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

const startLink = () => {
  return (
    <div>
      <div className="relative items-center w-full px-5 py-5 ">
        <div className="flex w-full mx-auto text-left">
          <div className="relative inline-flex items-center mx-auto align-middle">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              {MENULOGIN.map((each, key) => (
                <li className="nav-item mx-2" key={key}>
                  <Button variant="outline" className="px-3 py-2">
                    <Link
                      className="px-3 py-2  items-center  font-bold leading-snug hover:opacity-75"
                      href={each.url}
                    >
                      {each.displayName}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default startLink;
