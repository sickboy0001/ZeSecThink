"use server";

import { OUTPUTOVERCOUNTER } from "@/constants/d3Cloud";
import { getTokens, getTokensAnalyse } from "@/lib/token";

const API_URL = "https://labs.goo.ne.jp/api/morph"; // GooラボのAPIエンドポイントに置き換えてください
const API_KEY = process.env.NEXT_PUBLIC_GOOLAB_APIKEY; // Gooラボから取得したAPIキー
const API_URL_KEYWORD = "https://labs.goo.ne.jp/api/keyword";
const pos_filter = "名詞|Alphabet|Kana|Katakana|Kanji|Roman|Undef"; //補助名詞|

interface TypeCloudWord {
  text: string;
  value: number;
}

const analyseTextGoo = async (text: string) => {
  //   console.log(API_KEY);
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`, // APIキーが必要な場合
      },
      body: JSON.stringify({
        app_id: API_KEY,
        sentence: text,
        pos_filter: pos_filter,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const analyseKeywordGoo = async (text: string) => {
  //   console.log(API_KEY);
  try {
    const response = await fetch(API_URL_KEYWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`, // APIキーが必要な場合
      },

      body: JSON.stringify({
        app_id: API_KEY,
        title: text.slice(0, 10),
        body: text,
        max_num: 200,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getTokenAnalyseTextGoo = async (text: string) => {
  const result = await analyseTextGoo(text);

  const wordCount: { [key: string]: number } = {};
  result.word_list.forEach((wordArray: any) => {
    wordArray.forEach((wordInfo: any) => {
      const word = wordInfo[0];
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    });
  });
  //   const sortedWordCount = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);

  const sortedWordCount: TypeCloudWord[] = Object.entries(wordCount)
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .filter((each: any) => each.value > OUTPUTOVERCOUNTER);
  return sortedWordCount;
};

export const getTokenAnalyseKeywordGoo = async (text: string) => {
  const result = await analyseKeywordGoo(text);
  const wordCount = result.keywords.map((keyword: any) => {
    const text = Object.keys(keyword)[0];
    const value = Math.ceil(keyword[text] * 100);
    return { text, value };
  });

  // const wordCount: { [key: string]: number } = {};

  return wordCount;
};
