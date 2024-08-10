"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import {
  getTokenAnalyseKeywordGoo,
  getTokenAnalyseTextGoo,
} from "@/app/actions/gooapi/gooApi";
import { TypeWordCount } from "@/app/types/wordCloud";
import LocalWordCloud, {
  getLogicalFilename,
} from "@/components/clientWordCloud/clientWordCloud";
import { getTokenAnalyseKuromoji } from "@/lib/token";
import { GetLogicalPhysicalUid } from "@/app/actions/storageFilename/LogicalPhysicalUid";
import { uploadedPublicUrl } from "@/app/actions/storage/upload";

const thisApiType = "goolabtext"; //kuromoji / goolabtext / goolabkeyword
interface propsType {
  data: TypeZstPost[];
  publicFlg: number;
  fromAtString: string;
  toAtString: string;
  userid: number;
}

const getD3Data = async (data: TypeZstPost[], thisApiType: string) => {
  // 効率的な文字列結合
  const text = data.reduce(
    (acc, each) => acc + each.title + "\n" + each.content + "\n",
    ""
  );
  const nowApiType: string = thisApiType;
  if (nowApiType === "kuromoji") {
    const newDataD3data = await getTokenAnalyseKuromoji(text);
    return newDataD3data;
  }
  if (nowApiType === "goolabtext") {
    const newTextData = await getTokenAnalyseTextGoo(text);
    return newTextData;
  }
  if (nowApiType === "goolabkeyword") {
    const newKeywordData = await getTokenAnalyseKeywordGoo(text);
    return newKeywordData;
  }
};

const WeekSummaryd3cloud = (props: propsType) => {
  const { data, publicFlg, fromAtString, toAtString, userid } = props;
  // const data = prop.data;
  const [d3data, setD3data] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isExistImageFile, setIsExistImageFile] = useState(true);
  const [existImageUrl, setExistImageUrl] = useState("");
  useEffect(() => {
    // クライアントサイドでのマウント後にフラグをtrueに設定
    const fetch = async () => {
      const logical_filename = getLogicalFilename(
        thisApiType,
        publicFlg,
        userid,
        fromAtString,
        toAtString
      );
      console.log(
        "WeekSummaryd3cloud:logical_filename:start:",
        logical_filename
      );
      //Table登録されているかの確認
      const thisLogicalPhysicalUid = await GetLogicalPhysicalUid(
        logical_filename
      );
      console.log("WeekSummaryd3cloud:", thisLogicalPhysicalUid);

      if (!thisLogicalPhysicalUid) {
        console.error("Logical to physical UID mapping not found.");
        setIsExistImageFile(false);
        return;
      }

      //Storageあるかどうかの確認
      const filepathname =
        thisLogicalPhysicalUid.dir +
        "/" +
        thisLogicalPhysicalUid.physical_filename;
      console.log("const WeekSummaryd3cloud : filepathname:", filepathname);
      const path = await uploadedPublicUrl(filepathname);
      console.log("const WeekSummaryd3cloud : urlpath:", path);
      setExistImageUrl(path);

      // setIsExistImageFile(true);
    };
    fetch();
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (data.length == 0) {
        return;
      }
      const newData = await getD3Data(data, thisApiType);
      setD3data(newData);
    };
    fetch();
  }, [data]);

  if (!isClient) {
    // サーバーサイドレンダリング中またはクライアントサイドでのマウント前はnullを返す
    return null;
  }

  return (
    <div>
      {!isExistImageFile ? (
        <LocalWordCloud
          data={d3data}
          apiType={thisApiType}
          publicFlg={publicFlg}
          userid={userid}
          fromAtString={fromAtString}
          toAtString={toAtString}
        />
      ) : (
        <div>
          {existImageUrl ? (
            <Image
              src={existImageUrl}
              alt="Supabase Image"
              width={500}
              height={500}
              priority
            />
          ) : (
            "Loading..."
          )}
        </div>
      )}
    </div>
  );
};

export default WeekSummaryd3cloud;
