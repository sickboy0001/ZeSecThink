"use client";
import React, { useContext, useEffect, useState } from "react";
import { TypeZstTitle } from "@/app/types/title";
import { format } from "date-fns/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  registUserTitle,
  selectUserTitle,
} from "@/app/actions/zstPosts/usetTitle";
import UserContext from "@/components/user/UserContext";
import { ListDataTable } from "./ListDataTable";
import { columns } from "./ListColumnDef";
import { Separator } from "@/components/ui/separator";

const DummyUserSampleTitle = [
  {
    id: 10,
    title: "会社の立ち位置含めた他業者との付き合い方",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 11,
    title: "x日本での欠乏感の価値",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 12,
    title: "ポイ活",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 1,
    title: "NextJS",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 2,
    title: "喫煙",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 3,
    title: "コーヒーの良さ",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 4,
    title: "山登りの良さ",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 5,
    title: "体調管理",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 6,
    title: "個人・部下・上司について扱い方覚える",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 7,
    title: "減量メイン",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 8,
    title: "タバコ",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 13,
    title: "コモンズの悲劇",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 14,
    title: "急速に古ぼけていく事実",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 15,
    title: "邪推",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 16,
    title: "開発していく上での手順",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
];

const getUserTitles = async (userid: number) => {
  //   const result = await selectRandomTitleSample(count);
  return userid !== 0 ? await selectUserTitle(userid) : [];
};

const putUserTitles = async (userid: number, name: string) => {
  //   const result = await selectRandomTitleSample(count);
  const auto_create_flg = 0;
  return userid !== 0
    ? await registUserTitle(userid, name, auto_create_flg)
    : "";
};

const PageUserSampleTitle = () => {
  const [data, setData] = useState<any[]>([]);
  const [sampleTitle, setSampleTitle] = useState("");
  const user = useContext(UserContext);
  const user_id = user?.userid ?? 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleTitle(e.target.value);
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await getUserTitles(user_id);
      setData(data);
    };
    fetch();
  }, []);

  // 登録処理を実行する関数
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    putUserTitles(user_id, sampleTitle);

    // 登録処理をここに記述する
    console.log("登録されたデータ:", sampleTitle);

    const fetch = async () => {
      const thisData = await getUserTitles(user_id);
      setData(thisData);
    };
    fetch();

    // 例: サーバーにデータを送信する処理
    // fetch('/api/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ value: inputValue }),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));

    // 登録後、フォームのリセットなどを行う場合
    setSampleTitle(""); // 入力欄をクリア
  };

  // const data = datasample as TypeZstTitle[]; // props.data;
  return (
    <>
      <div>
        <form onSubmit={handleRegister}>
          <div className="flex items-center space-x-2 my-4">
            <label
              htmlFor="sampletitle"
              className="mb-2 text-sm font-medium text-gray-900"
            >
              SampleTitle
            </label>
            <Input
              id="sampletitle"
              placeholder="タイトルサンプル・・・"
              value={sampleTitle}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              登録
            </Button>
          </div>
        </form>
      </div>
      <Separator className="my-4" />
      <ListDataTable columns={columns} data={data} />
    </>
  );
};

export default PageUserSampleTitle;
