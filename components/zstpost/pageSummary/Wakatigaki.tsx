"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useContext, useEffect, useState } from "react";
import { ListDataTable } from "./ListDataTable";
import { columns } from "./ListColumnDef";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

var kuromoji = require("kuromoji");

interface propType {
  data: TypeZstPost[];
}
const Wakatigaki = (prop: propType) => {
  const data = prop.data;

  const [userInputText, setUserInputText] = useState("");
  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenizer, setTokenizer] = useState<any | null>(null);

  useEffect(() => {
    //アプリのマウント時にkuromojiトークナイザを初期化
    kuromoji
      .builder({ dicPath: "/kuromoji/dic/" })
      .build(function (err: any, buildTokenizer: any) {
        //dicPathで辞書のディレクトリを指定
        if (err) {
          console.log(err);
        } else {
          setTokenizer(buildTokenizer);
        }
      });
  }, []);

  function analyze(event: any) {
    event.preventDefault(); // デフォルトのフォーム送信を阻止
    if (!tokenizer) {
      console.error("トークナイザが利用できません");
      return;
    }

    const formData = new FormData(event.target);
    const text = formData.get("text") as string;
    setUserInputText(text); // 入力されたテキストをステートにセット

    // kuromojiを使ってテキストをトークナイズ
    const path = tokenizer.tokenize(text);
    setTokens(path); // トークナイズ結果をステートにセット
  }

  return (
    <div>
      <div className="App">
        <div className="card p-2 align-items-center">
          <form onSubmit={analyze}>
            <div className="flex">
              <Input
                name="text"
                type="text"
                placeholder="テキストを入力します"
              />
              <Button type="submit" className="btn btn-primary">
                Analyze
              </Button>
            </div>
          </form>
          <p>{userInputText}</p>
          {/* トークンの情報を表形式で表示 */}
          <table>
            <thead>
              <tr>
                <th>開始位置</th>
                <th>表層形</th>
                <th>品詞</th>
                <th>基本形</th>
                <th>読み</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td>{token.word_position}</td>
                  <td>{token.surface_form}</td>
                  <td>{token.pos}</td>
                  <td>{token.basic_form}</td>
                  <td>{token.reading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ListDataTable columns={columns} data={data} />
    </div>
  );
};

export default Wakatigaki;
