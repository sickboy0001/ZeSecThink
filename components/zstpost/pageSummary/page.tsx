"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import { addDays } from "date-fns";
import UserContext from "@/components/user/UserContext";
import ZstPageSummaryList from "./List";
import { GetDateTimeFormat } from "@/lib/utilsDate";
import ConditionInput from "./conditionInput";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wakatigaki from "./Wakatigaki";
import PostsWakatigaki from "./PostsWakatigaki";
import ScoreChart from "./scoreChart";

async function getDataLocal(
  userid: number,
  from_at: Date,
  to_at: Date
): Promise<TypeZstPost[]> {
  const result = await getPosts(userid, from_at, to_at);
  return result;
}

const ZstPageSummaryListPage = () => {
  const user = useContext(UserContext);
  const [zstPosts, setZstPosts] = useState<TypeZstPost[]>([]);
  const [fromAt, setFromAt] = useState<Date>(addDays(new Date(), -7));
  const [toAt, setToAt] = useState<Date>(new Date());

  // // const fromAt = addDays(new Date(), -7);
  // const toAt = new Date();

  useEffect(() => {
    const fetch = async () => {
      const nowZstPosts = await getDataLocal(user?.userid || 0, fromAt, toAt);

      setZstPosts(nowZstPosts);
      // console.log("ZstPageSummaryList:", nowZstPosts);
    };
    fetch();
  }, [fromAt, toAt]);

  return (
    <div>
      <div>
        <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-1 lg:max-w-none py-1">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
            <div className="flex flex-col justify-between flex-1 p-4 bg-white">
              <div className="flex items-center mt-3">
                <ConditionInput
                  fromAt={fromAt}
                  toAt={toAt}
                  setFromAt={setFromAt}
                  setToAt={setToAt}
                ></ConditionInput>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-1 lg:max-w-none py-1">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
            <div className="flex flex-col justify-between flex-1 p-4 bg-white">
              <div className="flex items-center mt-3">
                <Label className="px-2 font-extrabold">Display:</Label>
                {GetDateTimeFormat(fromAt, "yyyy/MM/dd")} ～
                {GetDateTimeFormat(toAt, "yyyy/MM/dd")}
              </div>
              <div>
                <Tabs defaultValue="List" className="">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="List">List</TabsTrigger>
                    <TabsTrigger value="wakati">wakati</TabsTrigger>
                    <TabsTrigger value="PostsWakatigaki">
                      PostsWakatigaki
                    </TabsTrigger>
                    <TabsTrigger value="ScoreChart">ScoreChart</TabsTrigger>
                  </TabsList>
                  <TabsContent value="List">
                    <div>
                      <ZstPageSummaryList data={zstPosts}></ZstPageSummaryList>
                    </div>
                  </TabsContent>
                  <TabsContent value="wakati">
                    <div>
                      <Wakatigaki data={zstPosts}></Wakatigaki>
                    </div>
                  </TabsContent>
                  <TabsContent value="PostsWakatigaki">
                    <PostsWakatigaki data={zstPosts}></PostsWakatigaki>
                  </TabsContent>
                  <TabsContent value="ScoreChart">
                    <ScoreChart data={zstPosts}></ScoreChart>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZstPageSummaryListPage;
