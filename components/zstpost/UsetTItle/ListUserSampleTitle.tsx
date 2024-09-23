"use client";
import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns/format";
import { selectUserTitle } from "@/app/actions/zstPosts/usetTitle";
import UserContext from "@/components/user/UserContext";
import { ListDataTable } from "./ListDataTable";
import { ListCreateColumnDef } from "./ListCreateColumnDef";

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

interface TypeProps {
  userSampleTitles: any[];
  fetchUserSampleTitles: () => void;
}

const ListUserSampleTitle = (props: TypeProps) => {
  const { userSampleTitles, fetchUserSampleTitles } = props;
  const user = useContext(UserContext);
  const user_id = user?.userid ?? 0;

  return (
    <>
      <ListDataTable
        columns={ListCreateColumnDef(fetchUserSampleTitles)}
        data={userSampleTitles}
      />
    </>
  );
};

export default ListUserSampleTitle;
