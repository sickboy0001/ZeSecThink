"use client";
import React, { useEffect, useState } from "react";
import { ListDataTable } from "./ListDataTable";
import { columns } from "./ListColumnDef";
import { TypeZstTitle } from "@/app/types/title";
import { format } from "date-fns/format";
import { selectAllTitleSample } from "@/app/actions/zstPosts/titleSample";

const datasample = [
  {
    id: 1,
    title: "どうやったら仕事が進むようになるか？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 2,
    title: "効率的な仕事の進め方とは？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 3,
    title: "仕事の手ごたえを感じるのはどんな時？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 4,
    title: "仕事の手ごたえを感じるとどうなる？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 5,
    title: "仕事が遅い人の特徴は？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 6,
    title: "仕事が早い人の特徴は？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 7,
    title: "仕事を早く終わらせるには？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 8,
    title: "仕事を続けるモチベーションになっているものは？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 9,
    title: "仕事を続けるメリット",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
  {
    id: 10,
    title: "なぜ論理的に話せなくなるのか？",
    comment: "",
    create_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
];

interface propType {
  data: string[];
}

const PageList = () => {
  const [data, setData] = useState<TypeZstTitle[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const thisData = await selectAllTitleSample();
      setData(thisData);
    };
    fetch();
  }, []);

  // const data = datasample as TypeZstTitle[]; // props.data;
  return (
    <div>
      <div></div>
      <ListDataTable columns={columns} data={data} />
    </div>
  );
};

export default PageList;
