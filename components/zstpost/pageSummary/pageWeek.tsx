"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import UserContext from "@/components/user/UserContext";
import {
  GetDateFromyyyyMMdd,
  GetDateTimeFormat,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
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
import {
  GetWeekChartSummary,
  TypeDayChartSummary,
} from "@/service/zstPost/Summary";
import { Button } from "@/components/ui/button";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

const startSunday = 0; //0:sunday 1:monday
const defPublicFlg = 1;

async function getDataLocal(
  userid: number,
  from_at: Date,
  to_at: Date
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
  let now = new Date();
  const [fromAt, setFromAt] = useState<Date>(now);
  const [toAt, setToAt] = useState<Date>(now);
  const [daySummarys, setDaySummarys] = useState<TypeDayChartSummary[]>([]);
  const [datebeforeString, setDatebeforeString] = useState<string>(datestring);
  const [dateafterString, setDateafterString] = useState<string>(datestring);

  useEffect(() => {
    const fetch = () => {
      let nowDate = GetDateFromyyyyMMdd(datestring);
      // console.log("ZstPageSummaryWeekPage:", nowDate);
      nowDate.setHours(0, 0, 0, 0);
      const newStartDate = subDays(nowDate, nowDate.getDay() - startSunday);
      setFromAt(newStartDate);
      setToAt(subDays(newStartDate, -6));

      setDatebeforeString(GetyyyyMMddJpFromDate(subDays(newStartDate, 7)));
      setDateafterString(GetyyyyMMddJpFromDate(subDays(newStartDate, -7)));
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
        zstPosts
      ) as TypeDayChartSummary[];
      setDaySummarys(thisDaySummarys);
    };
    fetch();
  }, [zstPosts]);

  return (
    <div>
      <div>
        {/* <div>{infostring}</div> */}
        <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-1 lg:max-w-none py-1">
          <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
            <div className="flex flex-col justify-between flex-1 p-4 bg-white">
              <div className="flex   flex-wrap items-center mt-3">
                <Button className="" variant="outline" size="icon">
                  <a href={`/zstPosts/summary/week/?date=${datebeforeString}`}>
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Label className="font-extrabold px-3">
                  {fromAt.toLocaleDateString()} ～{toAt.toLocaleDateString()}
                </Label>
                <Button className="" variant="outline" size="icon">
                  <a href={`/zstPosts/summary/week/?date=${dateafterString}`}>
                    <DoubleArrowRightIcon className="h-4 w-4" />
                  </a>
                </Button>
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
                      zstPosts={zstPosts}
                    ></WeekSummaryDocument>
                  </div>
                  <div>
                    <WeekSummaryChart
                      dayChartSummarys={daySummarys}
                    ></WeekSummaryChart>
                  </div>
                </div>
                <div className="">
                  {fromAt !== toAt ? (
                    <WeekSummaryd3cloud
                      data={zstPosts}
                      publicFlg={defPublicFlg}
                      userid={user?.userid || 0}
                      fromAtString={GetyyyyMMddJpFromDate(fromAt)}
                      toAtString={GetyyyyMMddJpFromDate(toAt)}
                    ></WeekSummaryd3cloud>
                  ) : (
                    "loading..."
                  )}
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
