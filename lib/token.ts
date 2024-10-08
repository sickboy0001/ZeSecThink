"use client";
import { TypeToken } from "@/app/types/kuromoji";
import { OUTPUTOVERCOUNTER } from "@/constants/d3Cloud";
import kuromoji from "kuromoji";

export const getTokenAnalyseKuromoji = async (text: string) => {
  const path = await getTokens(text);
  const result = getTokensAnalyse(path);

  const d3data = result
    .filter(([surface_form, count]) => count > OUTPUTOVERCOUNTER)
    .map(([surface_form, count]) => ({
      text: surface_form,
      value: count,
    }));
  // console.log(result.slice(0, 10));

  return d3data;
};

const no_include_pos = [
  "記号",
  "助動詞",
  "動詞",
  "副詞",
  "助詞",
  "形容詞",
  "接続詞",
];
const no_include_pos_detail_1 = ["非自立", "代名詞", "数"];
const no_include_pos_detail_2 = ["助数詞", "代名詞"];
export const getTokens = async (text: string): Promise<TypeToken[]> => {
  return new Promise((resolve, reject) => {
    const dicPath = "/kuromoji/dic/";
    // const dicPath = path.resolve("/tmp/kuromoji/dic/");
    kuromoji.builder({ dicPath: dicPath }).build((err, tokenizer) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const tokens = tokenizer.tokenize(text) as TypeToken[];
        resolve(tokens);
      }
    });
  });
};

export const getTokensAnalyse = (tokens: TypeToken[]) => {
  let filterd = tokens.filter(
    (each) =>
      !no_include_pos.includes(each.pos) &&
      !no_include_pos_detail_1.includes(each.pos_detail_1) &&
      !no_include_pos_detail_2.includes(each.pos_detail_2)
  );

  const tokenCountMap = new Map<string, number>();
  tokens.forEach((each) => {
    if (
      !no_include_pos.includes(each.pos) &&
      !no_include_pos_detail_1.includes(each.pos_detail_1) &&
      !no_include_pos_detail_2.includes(each.pos_detail_2)
    ) {
      const currentCount = tokenCountMap.get(each.surface_form) || 0;
      tokenCountMap.set(each.surface_form, currentCount + 1);
    }
  });

  // マップを配列に変換し、出現数でソート
  const sortedTokenCounts = Array.from(tokenCountMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  // デバッグ用に出力
  // sortedTokenCounts.forEach(([surface_form, count]) => {
  //   console.log(`${surface_form}: ${count}`);
  // });
  return sortedTokenCounts;
};
