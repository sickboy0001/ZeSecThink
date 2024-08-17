"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TypeZstTitle } from "@/app/types/title";
import { selectRandomTitleSample } from "@/app/actions/zstPosts/titleSample";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const QuotationList = (props: propsType) => {
  const { userid, setText, setOpen } = props; //, setIsShowQuotationList, handleChange
  const [data, setData] = useState<TypeZstTitle[]>([]);
  const [userData, setUserData] = useState<TypeZstTitle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      console.log("const QuotationList start");
      if (data.length === 0) {
        const thisData = await getRandomTitleSample(DEFCOUNT, 0, 0);
        setData(thisData);
      }
      if (userData.length === 0) {
        setUserData([]);
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
      setUserData([]);
    };
    fetch();
  }

  // const data = datasample as TypeZstTitle[]; // props.data;
  return (
    <div className="flex items-center  justify-center">
      <Tabs defaultValue="common" className="w-90">
        <div className="flex flex-wrap justify-between">
          <TabsList>
            <TabsTrigger value="common">common</TabsTrigger>
            <TabsTrigger value="user" disabled>
              user
            </TabsTrigger>
          </TabsList>
          <div className="flex">
            <Button
              type="button"
              onClick={handleCliclReload}
              variant="outline"
              size="icon"
            >
              <ReloadIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TabsContent value="common">
          <div>
            {data.map((each, key) => {
              return (
                <a
                  className="underline my-1 mx-1 px-1 py-1 text-gray-800 cursor-pointer"
                  key={key}
                  onClick={() => {
                    setText(each.title);
                    // setIsShowQuotationList(false);
                    setOpen(false);
                  }} // Change the text state on click
                >
                  {each.title}
                </a>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="user">
          <div>
            {userData.map((each, key) => {
              return (
                <a
                  className="underline my-1 mx-1 px-0.5 py-0.5 text-gray-800 cursor-pointer"
                  key={key + "123"}
                  onClick={() => {
                    setText(each.title);
                    setOpen(false);
                  }} // Change the text state on click
                >
                  {each.title}
                </a>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuotationList;
