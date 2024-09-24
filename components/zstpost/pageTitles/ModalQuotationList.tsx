"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TypeZstTitle } from "@/app/types/title";
import { selectRandomTitleSample } from "@/app/actions/zstPosts/titleSample";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuatationCommon from "./QuatationCommon";
import QuatationUser from "./QuatationUser";

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

const ModalQuotationList = (props: propsType) => {
  const { userid, setText, setOpen } = props; //, setIsShowQuotationList, handleChange

  // const data = datasample as TypeZstTitle[]; // props.data;
  return (
    <div className="flex items-center  justify-center">
      <Tabs defaultValue="common" className="w-90">
        <div className="flex flex-wrap justify-between">
          <TabsList>
            <TabsTrigger value="common">common</TabsTrigger>
            <TabsTrigger value="user">user</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="common">
          <div>
            <QuatationCommon
              userid={userid}
              setText={setText}
              setOpen={setOpen}
            ></QuatationCommon>
          </div>
        </TabsContent>
        <TabsContent value="user">
          <div>
            <QuatationUser
              userid={userid}
              setText={setText}
              setOpen={setOpen}
            ></QuatationUser>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModalQuotationList;
