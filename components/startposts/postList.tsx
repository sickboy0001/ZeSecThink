import React from "react";
import { DataTable } from "./dataTable";
import Link from "next/link";
import { columns, StartPost } from "@/components/startposts/postListColumn";
import { getStartPagePostMany } from "@/app/actions/startPage";
import { ja } from "date-fns/locale/ja";
import { format as formatTz } from "date-fns-tz";

async function getData(): Promise<StartPost[]> {
  // Fetch data from your API here.
  //getStartPagePostMany

  const response = await getStartPagePostMany();
  const max_content_length = 40;

  let result: StartPost[] = [];

  response?.forEach((item) => {
    const addStartPost = {
      id: String(item.id),
      cmd: "編集",
      datetime: formatTz(item.update_at, "yyyy年MM月dd日 HH時mm分", {
        timeZone: "Asia/Tokyo",
        locale: ja,
      }),
      //datetime_str, //String(item.update_at),
      tags: String(item.type_id),
      public_flg: String(item.public_flg),
      title: item.title,
      content:
        item.content.length > max_content_length
          ? item.content.substring(0, max_content_length) + "..."
          : item.content,
    };
    result.push(addStartPost);
  });
  return result;
}

const PostList = async () => {
  const data = await getData();
  return (
    <div>
      <Link
        href={`/start-posts/new`}
        className="px-3 py-2  font-medium text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        新規作成
      </Link>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PostList;
