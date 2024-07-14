import React from "react";
import StartTitle from "./startTitle";
import { getStartPagePostManyStartPage } from "@/app/actions/startPage";
import { TypeStartPost } from "@/app/types/types";

const contents = [
  {
    title: "動機(Iincentive)なぜ作ろうと思ったか",
    content:
      "ゼロ秒思考は有用な訓練方法と認識。実践していくうえで訓練時の成果物を有効利用できないか、訓練の進捗を表現できないかと考えた結果たどりついたツールです。ほぼ、自分用を想定手書きの紙はメリット大きいのは理解してますが今の時代だとスマホやpcでこなせば、使うメリットが大きいとかんがえてます。スマホでできればで電車の中、パッと思いついた時にできる。ＰＣだと、仕事中や作業中、ぱっと思い浮かんだときにすぐ書ける。わざわざa4準備する必要ない他にもデータとして蓄積されること。後で読み返しの簡単さが紙よりも楽！ここ一ヶ月のゼロ秒思考の進捗なども確認できることで自分の進化、成長具合も、確認できる。まずは、notionで試してみるが、それに適したツール作りたい！この仕組みでの大事なポイントは、新鮮なうちにすぐに書くこと。考えて文章を表現を考えること。メモることで自分の中で蓄えること。考えたらそのパターンを覚える馴染ませることでゼロ秒思考を目指すがゴールだと認識",
  },
  {
    title: "目的（aim）狙い",
    content: "お手軽に、ゼロ秒思考を実践できるツールを・・・と考えています。",
  },
  {
    title: "概要（overview）",
    content:
      "サイインし、ログイン後、日々のゼロ秒思考を「入力」入力時のデフォルトはPrivateのフラグが付与されています。これがついているものは個人情報を想定しているので、他者（他ログイン者）ではみることができません。登録したもの成績は「参照」で確認可能「サマリー」から、日々の実績は確認可能",
  },
  {
    title: "履歴",
    content:
      "2024年6月　ゼロ秒思考通読、Notionベースで利用の開始、いい利用の仕方ないか検討。ツール作ったほうがいいかという結論、2024年7月　コーディング勉強中 いまここ",
  },
];

async function getData(): Promise<TypeStartPost[]> {
  const response = await getStartPagePostManyStartPage();
  return response;
}

const StartPagePreview = async () => {
  const data = await getData();
  return (
    <div>
      <StartTitle></StartTitle>
      <section>
        <div className="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue">
          <div className="w-full mx-auto">
            {data.map((item, index) => (
              <div key={index}>
                <h2 className="text-2xl">{item.title}</h2>
                <p className=" mx-auto text-base leading-relaxed text-gray-500">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
        ;
      </section>
    </div>
  );
};

export default StartPagePreview;
