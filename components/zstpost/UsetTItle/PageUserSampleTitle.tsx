"use client";
import React, { useContext, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  registUserTitle,
  selectUserTitle,
} from "@/app/actions/zstPosts/usetTitle";
import UserContext from "@/components/user/UserContext";
import { Separator } from "@/components/ui/separator";
import ListUserSampleTitle from "./ListUserSampleTitle";

const getUserTitles = async (userid: number) => {
  //   const result = await selectRandomTitleSample(count);
  return userid !== 0 ? await selectUserTitle(userid) : [];
};

const putUserTitles = async (userid: number, name: string) => {
  //   const result = await selectRandomTitleSample(count);
  const auto_create_flg = 0;
  const invalid_flg = 1;
  const public_flg = 0;

  return userid !== 0
    ? await registUserTitle(
        userid,
        name,
        auto_create_flg,
        invalid_flg,
        public_flg
      )
    : "";
};

const PageUserSampleTitle = () => {
  const [userSampleTitles, setUserSampleTitles] = useState<any[]>([]);
  const [sampleTitle, setSampleTitle] = useState("");
  const user = useContext(UserContext);
  const user_id = user?.userid ?? 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleTitle(e.target.value);
  };

  const fetchUserSampleTitles = () => {
    const fetch = async () => {
      const thisData = await getUserTitles(user_id);
      setUserSampleTitles(thisData);
    };
    fetch();
  };

  // 登録処理を実行する関数
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    putUserTitles(user_id, sampleTitle);

    fetchUserSampleTitles();

    // 登録処理をここに記述する
    console.log("登録されたデータ:", sampleTitle);

    // 登録後、フォームのリセットなどを行う場合
    setSampleTitle(""); // 入力欄をクリア
  };
  useEffect(() => {
    fetchUserSampleTitles();
  }, []);

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
      <ListUserSampleTitle
        userSampleTitles={userSampleTitles}
        fetchUserSampleTitles={fetchUserSampleTitles}
      ></ListUserSampleTitle>
    </>
  );
};

export default PageUserSampleTitle;
