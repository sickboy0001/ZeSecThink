"use client";
import React, { useEffect, useState } from "react";
import { TypeZstTitle } from "@/app/types/title";
import { selectRandomTitleSample } from "@/app/actions/zstPosts/titleSample";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DEFCOUNT = 10;

interface propsType {
  userid: number;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setIsShowQuotationList: React.Dispatch<React.SetStateAction<boolean>>;
}

const getRandomTitleSample = async (
  count: number,
  typeuser: number,
  userid: number
) => {
  const result = await selectRandomTitleSample(count);
  return result;
};

const QuotationList = (props: propsType) => {
  const { userid, setText, setIsShowQuotationList } = props;
  const [data, setData] = useState<TypeZstTitle[]>([]);
  const [userData, setUserData] = useState<TypeZstTitle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const thisData = await getRandomTitleSample(DEFCOUNT, 0, 0);
      setData(thisData);
    };
    fetch();
  }, []);

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
    <div>
      <Tabs defaultValue="common" className="w-80">
        <div className="flex flex-wrap justify-between">
          <TabsList>
            <TabsTrigger value="common">common</TabsTrigger>
            <TabsTrigger value="password">user</TabsTrigger>
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
            <Button
              type="button"
              onClick={() => setIsShowQuotationList(false)}
              variant="outline"
              size="icon"
            >
              <Cross1Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TabsContent value="common">
          <div>
            {data.map((each, key) => {
              return (
                <a
                  className="underline my-1 mx-1 px-0.5 py-0.5 text-gray-800 cursor-pointer"
                  key={key}
                  onClick={() => {
                    setText(each.title);
                    setIsShowQuotationList(false);
                  }} // Change the text state on click
                >
                  {each.title}
                </a>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div>
            {data.map((each, key) => {
              return (
                <a
                  className="underline my-1 mx-1 px-0.5 py-0.5 text-gray-800 cursor-pointer"
                  key={key + "123"}
                  onClick={() => {
                    setText(each.title);
                    setIsShowQuotationList(false);
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
