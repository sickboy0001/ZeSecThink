"use client";
import React, { useEffect, useState } from "react";
import { TypeRecentTitle, TypeZstUserTitleSample } from "@/app/types/title";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { selectRandomUserSampleTitle } from "@/app/actions/zstPosts/usetTitle";
import { selectRececntPostTitles } from "@/app/actions/zstPosts/recentPostTitles";

const DEFCOUNT = 15;

interface propsType {
  userid: number;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsShowQuotationList: React.Dispatch<React.SetStateAction<boolean>>;
}

const getTitles = async (count: number, userid: number, days: number = 21) => {
  console.log(userid);
  const result = userid
    ? await selectRececntPostTitles(count, 1, undefined, days)
    : [];
  console.log(result);
  return result;
};

const QuatationUser = (props: propsType) => {
  const { userid, setText, setOpen } = props; //, setIsShowQuotationList, handleChange
  const [data, setData] = useState<TypeRecentTitle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (data.length === 0) {
        const thisData = await getTitles(DEFCOUNT, userid);
        if (thisData != null) {
          setData(thisData);
          console.log(thisData);
        }
      }
    };
    fetch();
  }, []); // 依存関係を空配列に変更

  return (
    <div className="flex items-center  justify-center">
      <div>
        user:
        {data.map((each, key) => {
          return (
            <a
              className="underline my-1 mx-1 px-1 py-1 text-gray-800 cursor-pointer"
              key={key}
              onClick={() => {
                setText(each.title);
                setOpen(false);
              }}
            >
              {each.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default QuatationUser;
