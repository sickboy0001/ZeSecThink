"use client";
import React, { useContext, useEffect, useState } from "react";
import { addDays, subDays, subWeeks } from "date-fns";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TypeZstPost } from "@/app/types/zstTypes";
import { getPosts } from "@/app/actions/zstPosts/posts";
import UserContext from "@/components/user/UserContext";
import { GetDateTimeFormat, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";

import ConditionInput from "./conditionInput";
import Wakatigaki from "./Wakatigaki";
import ZstPageSummaryList from "./List";
import ScoreChart from "./scoreChart";
import PostsWakatigaki from "./PostsWakatigaki";

const startSunday = 0; //0:sunday 1:monday

async function getDataLocal(
  userid: number,
  from_at: Date,
  to_at: Date
): Promise<TypeZstPost[]> {
  const result = await getPosts(userid, from_at, to_at);
  return result;
}

const ZstPageSummaryPageWeek = () => {
  const user = useContext(UserContext);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [fromAt, setFromAt] = useState<Date>(addDays(new Date(), -7));
  const [toAt, setToAt] = useState<Date>(new Date());
  const [zstPosts, setZstPosts] = useState<TypeZstPost[]>([]);

  //日付の整形//今の日曜日をゲット
  useEffect(() => {
    const fetch = () => {
      let nowDate = new Date();
      nowDate.setHours(0, 0, 0, 0);
      const newStartDate = subDays(nowDate, nowDate.getDay() - startSunday + 7);
      setFromAt(newStartDate);
      setToAt(subDays(newStartDate, -6));
      setStartDate(newStartDate);
    };

    fetch();
  }, []);
  //endDateの取得
  //結果の表示

  useEffect(() => {
    const fetch = async () => {
      // console.log(fromAt, toAt);
      const nowZstPosts = await getDataLocal(user?.userid || 0, fromAt, toAt);

      setZstPosts(nowZstPosts);
    };
    fetch();
  }, [fromAt, toAt]);

  return (
    <div>
      <div>
        {GetDateTimeFormat(startDate, "M月d日(EEE)") +
          "-" +
          GetDateTimeFormat(subDays(subWeeks(startDate, -1), 1), "M月d日(EEE)")}
      </div>
      <div>
        {/* <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-1 lg:max-w-none py-1">
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
        </div> */}
      </div>
      <div>
        <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-1 lg:max-w-none py-1">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
            <div className="flex flex-col justify-between flex-1 p-4 bg-white">
              <div>
                <ZstPageSummaryList
                  data={zstPosts.slice(0, 10)}
                ></ZstPageSummaryList>
              </div>
              <div>
                <ZstPageSummaryList
                  data={zstPosts.slice(0, 10)}
                ></ZstPageSummaryList>
              </div>
              <div>{/* <Wakatigaki data={zstPosts}></Wakatigaki> */}</div>

              <div>
                <Tabs defaultValue="List" className="">
                  {/* <TabsList className="grid w-full grid-cols-4">
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
                  </TabsContent> */}
                  {/* <TabsContent value="wakati">
                    <div>
                      <Wakatigaki data={zstPosts}></Wakatigaki>
                    </div>
                  </TabsContent>
                  <TabsContent value="PostsWakatigaki">
                    <PostsWakatigaki data={zstPosts}></PostsWakatigaki>
                  </TabsContent>
                  <TabsContent value="ScoreChart">
                    <ScoreChart data={zstPosts}></ScoreChart>
                  </TabsContent> */}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZstPageSummaryPageWeek;
