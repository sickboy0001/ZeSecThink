"use client";
import React, { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { TypeWordCount } from "@/app/types/wordCloud";
import WordCloud from "react-d3-cloud";
import { uploadImage } from "@/app/actions/storage/upload";
import { v4 as uuidv4 } from "uuid"; // UUIDライブラリのインポート
import { registLogicalPhysicaluid } from "@/app/actions/storageFilename/LogicalPhysicalUid";

// // 動的インポートを使用してクライアントサイドでのみWordCloudコンポーネントをレンダリング
// const WordCloud = dynamic(() => import("react-d3-cloud"), { ssr: false });

interface propsType {
  data: TypeWordCount[];
  apiType: string;
  publicFlg: number;
  fromAtString: string;
  toAtString: string;
  userid: number;
}

export const getLogicalFilename = (
  apiType: string,
  publicFlg: number,
  userid: number,
  fromAtString: string,
  toAtString: string
) => {
  return `${apiType}-${publicFlg.toString()}-${userid.toString()}-${fromAtString}-${toAtString}`;
};

const fontSizeMapper = (word: TypeWordCount) => Math.pow(word.value, 0.8) * 10;
const fontFamily = "meiryo";

const localUploadImage = async (current: HTMLDivElement, uuid: string) => {
  try {
    const dataUrl = await domtoimage.toPng(current, {
      width: current.clientWidth,
      height: current.clientHeight,
    });

    const base64Data = dataUrl.split(",")[1];
    const filePath = `images/${uuid}.png`; // 適切なファイルパスを設定

    const uploadResult = await uploadImage(filePath, base64Data);
    if (uploadResult) {
      console.log("Image captured and uploaded successfully!");
    }
  } catch (error) {
    console.error("Error capturing or uploading image:", error);
    console.log("Failed to capture or upload image.");
  }
};

const ClientWordCloud = (props: propsType) => {
  const { data, apiType, publicFlg, userid, fromAtString, toAtString } = props;
  const wordCloudRef = useRef<HTMLDivElement>(null);
  // console.log("LocalWordCloud(props):", props);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのマウント後にフラグをtrueに設定
    setIsClient(true);
  }, []);

  useEffect(() => {
    const captureAndUploadImage = async () => {
      if (wordCloudRef.current) {
        const uuid = uuidv4();
        //Insert  logical_physical_uid
        console.log("captureAndUploadImage s-e", fromAtString, toAtString);
        const logical_filename = getLogicalFilename(
          apiType,
          publicFlg,
          userid,
          fromAtString,
          toAtString
        );
        // apiType,publicFlg, userid, fromAtString, toAtString,
        const physical_filename = uuid + ".png";

        await registLogicalPhysicaluid(logical_filename, physical_filename);
        //UploadImage
        await localUploadImage(wordCloudRef.current, uuid);
      }
    };

    if (wordCloudRef.current) {
      const observer = new MutationObserver((mutationsList) => {
        // DOM 要素の変更があった場合にキャプチャを実行
        captureAndUploadImage();
        observer.disconnect(); // 一度実行したら監視を停止
      });

      observer.observe(wordCloudRef.current, {
        childList: true,
        subtree: true,
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={wordCloudRef}
      className={`w-[500px] min-w-[380px] h-[500px] min-h-[380px]`}
    >
      <WordCloud data={data} fontSize={fontSizeMapper} font={fontFamily} />
    </div>
  );
};
export default ClientWordCloud;
