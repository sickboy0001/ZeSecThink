"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import UserContext from "@/components/user/UserContext";
import { GetDateFromyyyyMMdd, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";

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
import {
  GetWeekChartSummary,
  TypeDayChartSummary,
} from "@/service/zstPost/Summary";
import D3ColudCondition from "./d3CloudCondition";
import HeatMapPost from "./HeatMapPost";

const startSunday = 0; //0:sunday 1:monday

const defPublicFlg = 1;
const defApiType = "goolabtext"; //kuromoji / goolabtext / goolabkeyword

async function getDataLocal(
  userid: number,
  from_at: Date,
  to_at: Date,
): Promise<TypeZstPost[]> {
  const result = await getPosts(userid, from_at, to_at);
  return result;
}

interface propType {
  datestring: string;
}

const ZstPageSummaryWeekPage = (props: propType) => {
  const { datestring } = props;
  // datestring yyyyMMdd
  const user = useContext(UserContext);
  const [zstPosts, setZstPosts] = useState<TypeZstPost[]>([]);
  const [fromAt, setFromAt] = useState<Date>(new Date());
  const [toAt, setToAt] = useState<Date>(new Date());
  const [daySummarys, setDaySummarys] = useState<TypeDayChartSummary[]>([]);
  const [publicFlg, setPublicFlg] = useState<number>(defPublicFlg);
  const [apiType, setApiType] = useState<string>(defApiType);

  useEffect(() => {
    const fetch = () => {
      let nowDate = GetDateFromyyyyMMdd(datestring);
      // console.log("ZstPageSummaryWeekPage:", nowDate);
      nowDate.setHours(0, 0, 0, 0);
      const newStartDate = subDays(nowDate, nowDate.getDay() - startSunday);
      setFromAt(newStartDate);
      setToAt(subDays(newStartDate, -6));

      setZstPosts([]);
      // setStartDate(newStartDate);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (fromAt === toAt) {
        return;
      } else {
        // console.log(fromAt, toAt);
        const nowZstPosts = await getDataLocal(user?.userid || 0, fromAt, toAt);
        setZstPosts(nowZstPosts);
      }
      // console.log("ZstPageSummaryList:", nowZstPosts);
    };
    fetch();
  }, [fromAt, toAt]);

  useEffect(() => {
    const fetch = async () => {
      if (zstPosts.length == 0) {
        return;
      }
      const thisDaySummarys = GetWeekChartSummary(
        zstPosts,
      ) as TypeDayChartSummary[];
      setDaySummarys(thisDaySummarys);
    };
    fetch();
  }, [zstPosts]);

  return (
    <div>
      <div></div>
      <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-1 lg:max-w-none py-1">
        <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
          <div className="flex flex-col justify-between flex-1 p-4 bg-white">
            <div className="text-lg">HeatMap</div>
            <HeatMapPost></HeatMapPost>
          </div>
        </div>
      </div>
      <div>
        {/* <div>{infostring}</div> */}
        <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-1 lg:max-w-none py-1">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
            <div className="flex flex-col justify-between flex-1 p-4 bg-white">
              <D3ColudCondition
                datestring={datestring}
                fromAt={fromAt}
                toAt={toAt}
                publicFlg={publicFlg}
                setPublicFlg={setPublicFlg}
                apiType={apiType}
                setApiType={setApiType}
              ></D3ColudCondition>
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
                      zstPosts={zstPosts}
                    ></WeekSummaryDocument>
                  </div>
                  <div>
                    <WeekSummaryChart
                      dayChartSummarys={daySummarys}
                    ></WeekSummaryChart>
                  </div>
                </div>
                {/* <div className="">
                  {fromAt !== toAt ? (
                    <WeekSummaryd3cloud
                      data={zstPosts}
                      apiType={apiType}
                      publicFlg={publicFlg}
                      userid={user?.userid || 0}
                      fromAtString={GetyyyyMMddJpFromDate(fromAt)}
                      toAtString={GetyyyyMMddJpFromDate(toAt)}
                    ></WeekSummaryd3cloud>
                  ) : (
                    "loading..."
                  )}
                </div>*/}
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
