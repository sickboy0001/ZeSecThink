"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "@/app/actions/zstPosts/posts";
import UserContext from "@/components/user/UserContext";
import { GetDateFromyyyyMMdd, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { Label } from "@/components/ui/label";

import { subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

const startSunday = 0; //0:sunday 1:monday
const defPublicFlg = 1;
//kuromoji / goolabtext / goolabkeyword

const EnumApiType = [
  {
    displayname: "Goo Lab",
    name: "goolabtext",
  },
  {
    displayname: "Goo Lab Keyword",
    name: "goolabkeyword",
  },
  {
    displayname: "Kuromoji",
    name: "kuromoji",
  },
];

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
  fromAt: Date;
  toAt: Date;
  publicFlg: number;
  setPublicFlg: React.Dispatch<React.SetStateAction<number>>;
  apiType: string;
  setApiType: React.Dispatch<React.SetStateAction<string>>;
}

const D3ColudCondition = (props: propType) => {
  const {
    datestring,
    fromAt,
    toAt,
    publicFlg,
    setPublicFlg,
    apiType,
    setApiType,
  } = props; // datestring yyyyMMdd
  const user = useContext(UserContext);
  const [zstPosts, setZstPosts] = useState<TypeZstPost[]>([]);
  let now = new Date();
  // const [fromAt, setFromAt] = useState<Date>(now);
  // const [toAt, setToAt] = useState<Date>(now);
  const [datebeforeString, setDatebeforeString] = useState<string>(datestring);
  const [dateafterString, setDateafterString] = useState<string>(datestring);

  useEffect(() => {
    const fetch = () => {
      let nowDate = GetDateFromyyyyMMdd(datestring);
      // console.log("ZstPageSummaryWeekPage:", nowDate);
      nowDate.setHours(0, 0, 0, 0);
      const newStartDate = subDays(nowDate, nowDate.getDay() - startSunday);

      setDatebeforeString(GetyyyyMMddJpFromDate(subDays(newStartDate, 7)));
      setDateafterString(GetyyyyMMddJpFromDate(subDays(newStartDate, -7)));
      setZstPosts([]);
      // setStartDate(newStartDate);
    };
    fetch();
  }, []);

  return (
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

      <div className="flex flex-wrap px-4">
        <RadioGroup
          defaultValue={apiType}
          onValueChange={(value) => {
            // event.targetをHTMLInputElementとしてキャスト
            // console.log(value);
            setApiType(value);
          }}
          className="flex flex-wrap items-center"
        >
          {EnumApiType.map((each, index) => (
            <div className="flex items-center space-x-1" key={index}>
              <RadioGroupItem value={each.name} id={each.name} />
              <Label htmlFor={each.name}>{each.displayname}</Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex ml-4 items-center space-x-2">
          <Switch
            id={`public_flg`}
            checked={publicFlg === 1} //{isCheckedDelete}
            // ref={switchDeleteRef}
            onCheckedChange={(value) => {
              setPublicFlg(value ? 1 : 0);
            }}
          />
          <Label className="" htmlFor={`public_flg`}>
            PulblicOnly
          </Label>
        </div>
      </div>
    </div>
  );
};

export default D3ColudCondition;
