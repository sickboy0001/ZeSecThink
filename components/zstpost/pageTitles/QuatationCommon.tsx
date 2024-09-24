"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TypeZstTitle } from "@/app/types/title";
import { selectRandomTitleSample } from "@/app/actions/zstPosts/titleSample";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModalQuotationList from "./ModalQuotationList";

const DEFCOUNT = 10;

interface propsType {
  userid: number;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsShowQuotationList: React.Dispatch<React.SetStateAction<boolean>>;
}

const getRandomTitleSample = async (
  count: number,
  typeuser: number,
  userid: number
) => {
  //   const result = await selectRandomTitleSample(count);
  return typeuser === 0 ? await selectRandomTitleSample(count) : [];
};

const QuatationCommon = (props: propsType) => {
  const { userid, setText, setOpen } = props; //, setIsShowQuotationList, handleChange
  const [data, setData] = useState<TypeZstTitle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      console.log("const QuotationList start");
      if (data.length === 0) {
        const thisData = await getRandomTitleSample(DEFCOUNT, 0, 0);
        setData(thisData);
      }
      console.log("const QuotationList end");
    };
    fetch();
  }, []); // 依存関係を空配列に変更

  function handleCliclReload(): void {
    console.log("handleCliclReload");
    const fetch = async () => {
      const thisData = await getRandomTitleSample(DEFCOUNT, 0, 0);
      setData(thisData);
    };
    fetch();
  }

  // const data = datasample as TypeZstTitle[]; // props.data;
  return (
    <div className="flex items-center  justify-center">
      <div>
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

export default QuatationCommon;
