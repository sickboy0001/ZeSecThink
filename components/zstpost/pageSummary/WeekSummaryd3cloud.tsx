"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useEffect, useState } from "react";
import {
  getTokenAnalyseKeywordGoo,
  getTokenAnalyseTextGoo,
} from "@/app/actions/gooapi/gooApi";
import LocalWordCloud, {
  getLogicalFilename,
} from "@/components/clientWordCloud/clientWordCloud";
import { getTokenAnalyseKuromoji } from "@/lib/token";
import { deleteLogiclPhysicalUidWithFile } from "@/app/actions/storageFilename/LogicalPhysicalUid";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import ExistImageFile from "./existImageFile";
import { DEFD3TEXT } from "@/constants/d3Cloud";

const getD3Data = async (
  data: TypeZstPost[],
  thisApiType: string,
  publicFlg: number
) => {
  let text = data.reduce((acc, each) => {
    if (each.public_flg) {
      return acc + each.title + "\n" + each.content + "\n";
    } else {
      if (publicFlg === 1) {
        //対象(each.public_flg=false)がプライベートで、
        //分析対象の文面も公開(publicFlg=1)なら
        //分析対象から省く
        return acc;
      } else {
        //非公開対象も対象(publicFlg=0)なら、加える
        return acc + each.title + "\n" + each.content + "\n";
      }
    }
  }, "");
  if (text.trim().length === 0) {
    text = DEFD3TEXT;
  }

  // console.log("getD3Data", data, data.length, text);
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

interface propsType {
  data: TypeZstPost[];
  apiType: string;
  publicFlg: number;
  fromAtString: string;
  toAtString: string;
  userid: number;
}

const WeekSummaryd3cloud = (props: propsType) => {
  const { data, apiType, publicFlg, fromAtString, toAtString, userid } = props;
  // const data = prop.data;
  const [d3data, setD3data] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isExistImageFile, setIsExistImageFile] = useState(true);
  const [createImageAt, setCreateImageAt] = useState(new Date());
  useEffect(() => {
    setIsClient(true);
  }, []);

  const createD3Data = async () => {
    const newData = await getD3Data(data, apiType, publicFlg);
    setD3data(newData);
  };

  useEffect(() => {
    setIsExistImageFile(true);
  }, [apiType, publicFlg, fromAtString, toAtString, userid]);

  useEffect(() => {
    const fetch = async () => {
      if (data.length == 0) {
        return;
      }
      if (isExistImageFile) {
        return;
      }
      createD3Data();
    };
    fetch();
  }, [data, isExistImageFile]);

  // 削除処理を行う関数
  const deleteItem = () => {
    const fetch = async () => {
      // ここに削除処理のロジックを実装します
      // 例えば、APIリクエストを送ってデータを削除したり、状態を更新したりします
      console.log("deleteItem start");
      const logicalFilepath = getLogicalFilename(
        apiType,
        publicFlg,
        userid,
        fromAtString,
        toAtString
      );

      await deleteLogiclPhysicalUidWithFile(logicalFilepath);

      setIsExistImageFile(false);
      console.log("deleteItem end", data.length, isExistImageFile);
      // createD3Data();
    };

    fetch();
  };

  if (!isClient) {
    // サーバーサイドレンダリング中またはクライアントサイドでのマウント前はnullを返す
    return null;
  }
  return (
    <div>
      {!isExistImageFile ? (
        <LocalWordCloud
          data={d3data}
          apiType={apiType}
          publicFlg={publicFlg}
          userid={userid}
          fromAtString={fromAtString}
          toAtString={toAtString}
          isExistImageFile={isExistImageFile}
          setCreateImageAt={setCreateImageAt}
        />
      ) : (
        <div>
          <ExistImageFile
            thisApiType={apiType}
            publicFlg={publicFlg}
            userid={userid}
            fromAtString={fromAtString}
            toAtString={toAtString}
            setIsExistImageFile={setIsExistImageFile}
            setCreateImageAt={setCreateImageAt}
          ></ExistImageFile>
        </div>
      )}
      <Button onClick={deleteItem}>reload</Button>
      Create at : {format(createImageAt, "yyyy-MM-dd HH:mm:ss")}
    </div>
  );
};

export default WeekSummaryd3cloud;
