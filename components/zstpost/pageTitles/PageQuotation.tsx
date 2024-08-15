"use client";
import React, { useEffect, useState } from "react";
import { TypeZstTitle } from "@/app/types/title";
import { selectRandomTitleSample } from "@/app/actions/zstPosts/titleSample";

import QuotationList from "./QuotationList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Cross1Icon } from "@radix-ui/react-icons";

interface propType {
  data: string[];
}

const PageQuotation = () => {
  const [data, setData] = useState<TypeZstTitle[]>([]);
  const [text, setText] = useState<string>("");
  const [isShowQuotationList, setIsShowQuotationList] =
    useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const defuserid = 1;

  // const data = datasample as TypeZstTitle[]; // props.data;
  return (
    <div className="">
      <div className="flex">
        <Input
          type="title"
          name="title"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="タイトル"
          value={text}
          onChange={handleChange}
        />
        <div>
          <Button
            type="button"
            onClick={() => setIsShowQuotationList(true)}
            variant="outline"
            size="icon"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {isShowQuotationList ? (
        <div>
          <QuotationList
            userid={defuserid}
            setText={setText}
            setIsShowQuotationList={setIsShowQuotationList}
          ></QuotationList>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PageQuotation;
