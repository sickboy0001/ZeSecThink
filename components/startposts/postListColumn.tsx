"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type StartPost = {
  cmd: string;
  datetime: string;
  tags: string;
  public_flg: string;
  title: string;
  content: string;
  id: string;
};

export const columns: ColumnDef<StartPost>[] = [
  {
    accessorKey: "cmd",
    header: "cmd",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <>
          <Link
            href={`/startPosts/edit/${original.id}`}
            className="px-2 py-1  text-sm font-medium text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            編集
          </Link>
        </>
      );
    },
  },
  {
    accessorKey: "datetime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          日付
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  //   header: "日付",

  {
    accessorKey: "tags",
    header: "タグ",
  },
  {
    accessorKey: "public_flg",
    header: "公開",
  },
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "content",
    header: "内容",
  },
];
