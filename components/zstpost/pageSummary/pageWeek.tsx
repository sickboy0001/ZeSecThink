"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import UserContext from "@/components/user/UserContext";
import { GetDateTimeFormat } from "@/lib/utilsDate";
import ConditionInput from "./conditionInput";
import { Label } from "@/components/ui/label";

import WeekSummaryd3cloud from "./WeekSummaryd3cloud";
import WeekSummaryChart from "./WeekSummaryChart";
import { subDays } from "date-fns";
import WeekSummaryDocument from "./WeekSummaryDocument";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { columns } from "./ListColumnDef";
import { ListDataTable } from "./ListDataTable";

const startSunday = 0; //0:sunday 1:monday

async function getDataLocal(
  userid: number,
  from_at: Date,
  to_at: Date
): Promise<TypeZstPost[]> {
  const result = await getPosts(userid, from_at, to_at);
  return result;
}

const ZstPageSummaryWeekPage = () => {
  const user = useContext(UserContext);
  const [zstPosts, setZstPosts] = useState<TypeZstPost[]>([]);
  let now = new Date();
  const [fromAt, setFromAt] = useState<Date>(now);
  const [toAt, setToAt] = useState<Date>(now);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    const fetch = () => {
      let nowDate = new Date();
      nowDate.setHours(0, 0, 0, 0);
      const newStartDate = subDays(nowDate, nowDate.getDay() - startSunday + 7);
      setFromAt(newStartDate);
      setToAt(subDays(newStartDate, -6));
      setZstPosts([]);
      // setStartDate(newStartDate);
    };
    fetch();
  }, []);

  // // const fromAt = addDays(new Date(), -7);
  // const toAt = new Date();

  useEffect(() => {
    const fetch = async () => {
      if (fromAt === toAt) {
        return;
      } else {
        // console.log(fromAt, toAt);
        const nowZstPosts = await getDataLocal(user?.userid || 0, fromAt, toAt);
        setZstPosts(nowZstPosts);
        setEndTime(new Date());
      }
      // console.log("ZstPageSummaryList:", nowZstPosts);
    };
    fetch();
  }, [fromAt, toAt]);

  const infostring =
    "[" +
    String((endTime.getTime() - startTime.getTime()) / 1000) +
    "sec]" +
    "start-end:" +
    GetDateTimeFormat(startTime, "HH:mm:ss") +
    " - " +
    GetDateTimeFormat(endTime, "HH:mm:ss");

  return (
    <div>
      <div>
        {/* <div>{infostring}</div> */}
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
            <div className="flex flex-col justify-between flex-1 p-4 bg-white w-full">
              <div className="flex flex-wrap">
                <div className="">
                  <div className="flex items-center mt-3">
                    <WeekSummaryDocument
                      fromAt={fromAt}
                      toAt={toAt}
                      data={zstPosts}
                    ></WeekSummaryDocument>
                  </div>
                  <div>
                    <WeekSummaryChart data={zstPosts}></WeekSummaryChart>
                  </div>
                </div>
                <div className="">
                  <WeekSummaryd3cloud data={zstPosts}></WeekSummaryd3cloud>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-3">
                  <AccordionTrigger>一覧</AccordionTrigger>
                  <AccordionContent>
                    <ListDataTable columns={columns} data={zstPosts} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZstPageSummaryWeekPage;
