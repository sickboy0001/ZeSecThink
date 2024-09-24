"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TypeZstTitle, TypeZstUserTitleSample } from "@/app/types/title";
import { selectRandomTitleSample } from "@/app/actions/zstPosts/titleSample";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModalQuotationList from "./ModalQuotationList";
import { selectRandomUserSampleTitle } from "@/app/actions/zstPosts/usetTitle";

const DEFCOUNT = 10;

interface propsType {
  userid: number;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsShowQuotationList: React.Dispatch<React.SetStateAction<boolean>>;
}

const getRandomUserSampleTitle = async (count: number, userid: number) => {
  //   const result = await selectRandomTitleSample(count);
  console.log(userid);
  const result = userid ? await selectRandomUserSampleTitle(count, userid) : [];
  console.log(result);
  return result;
};

const QuatationUser = (props: propsType) => {
  const { userid, setText, setOpen } = props; //, setIsShowQuotationList, handleChange
  const [data, setData] = useState<TypeZstUserTitleSample[]>([]);

  useEffect(() => {
    const fetch = async () => {
      // console.log("const QuotationList start");
      if (data.length === 0) {
        const thisData = await getRandomUserSampleTitle(DEFCOUNT, userid);
        setData(thisData);
      }
      // console.log("const QuotationList end");
    };
    fetch();
  }, []); // 依存関係を空配列に変更

  function handleCliclReload(): void {
    console.log("handleCliclReload", userid);
    const fetch = async () => {
      const thisData = await getRandomUserSampleTitle(DEFCOUNT, userid);
      setData(thisData);
    };
    fetch();
  }

  // const data = datasample as TypeZstTitle[]; // props.data;
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
                setText(each.name);
                setOpen(false);
              }}
            >
              {each.name}
            </a>
          );
        })}
        <Button
          type="button"
          onClick={handleCliclReload}
          variant="outline"
          size="icon"
        >
          <ReloadIcon className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default QuatationUser;
