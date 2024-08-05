"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TypeZstPost } from "@/app/types/zstTypes";
import { TypeWordCount } from "@/app/types/wordCloud";
import WordCloud from "react-d3-cloud";

// // 動的インポートを使用してクライアントサイドでのみWordCloudコンポーネントをレンダリング
// const WordCloud = dynamic(() => import("react-d3-cloud"), { ssr: false });

interface propType {
  data: TypeWordCount[];
}

const fontSizeMapper = (word: TypeWordCount) => Math.pow(word.value, 0.8) * 10;
const fontFamily = "meiryo";

const LocalWordCloud = (prop: propType) => {
  const [isClient, setIsClient] = useState(false);
  const data = prop.data;

  useEffect(() => {
    // クライアントサイドでのマウント後にフラグをtrueに設定
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <WordCloud data={data} fontSize={fontSizeMapper} font={fontFamily} />
    </div>
  );
};

export default LocalWordCloud;
