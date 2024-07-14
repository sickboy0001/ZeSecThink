import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ZstTitle from "./zstTitles";
import { ja } from "date-fns/locale/ja";
import { format as formatTz } from "date-fns-tz";

import { TypeZstDay, TypeZstPost } from "@/app/types/zstTypes";
import ZstModalNew from "./zstModalNew";
import { createClient } from "@/utils/supabase/client";

interface propTypes {
  className: string;
  date: Date;
  key: number;
  zstPosts: TypeZstPost[];
}

const ZstDayTitles = async ({ className, ...props }: propTypes) => {
  const { zstPosts, date, key } = props;
  const [showEdit, setShowEdit] = useState(false);

  const isSunday = date.getDay() === 0;
  const isSatday = date.getDay() === 6;

  const user_id = 1;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  const formElement = (
    <ZstModalNew
      showModal={setShowEdit}
      date={date}
      user_id={user_id}
      key={Number(key)}
    ></ZstModalNew>
  );

  return (
    <>
      <div key={String(key)}>
        <Card className={cn(className)} {...props}>
          <CardHeader>
            <CardTitle
              className={` ${isSunday ? "text-red-500" : ""} ${
                isSatday ? "text-blue-500" : ""
              }`}
            >
              {formatTz(date, "yyyy/MM/dd", {
                timeZone: "Asia/Tokyo",
                locale: ja,
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-1">
            <div>
              <ZstTitle date={date} zstPosts={zstPosts}></ZstTitle>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setShowEdit(true)}
            >
              <Pencil2Icon className="mr-2 h-4 w-4" /> add
            </Button>
          </CardFooter>
        </Card>
        {showEdit ? (
          <>
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-black-rgba">
              <div className="m-auto relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">
                      test
                    </h3>
                    <button
                      type="button"
                      className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      data-modal-hide="authentication-modal"
                      onClick={() => setShowEdit(false)}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">モーダルを閉じる</span>
                    </button>
                  </div>
                  <div className="p-4 md:p-5">{formElement}</div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ZstDayTitles;
