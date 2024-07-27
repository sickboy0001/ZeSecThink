"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeZstPost } from "@/app/types/zstTypes";
import { GetDateTimeFormat } from "@/lib/utilsDate";

export const columns: ColumnDef<TypeZstPost>[] = [
  {
    accessorKey: "current_at",
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
    cell: ({ row }) => {
      const original = row.original;
      return <>{GetDateTimeFormat(row.getValue("current_at"), "yyyy/MM/dd")}</>;
    },
  },
  {
    accessorKey: "public_flg",
    header: "公開",
  },
  {
    accessorKey: "delete_flg",
    header: "削除",
  },
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "content",
    header: "内容",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <>
          <div className="whitespace-pre-wrap">{row.getValue("content")}</div>
        </>
      );
    },
  },
  {
    accessorKey: "second",
    header: "秒",
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          作成
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const original = row.original;
      return (
        <>
          {GetDateTimeFormat(row.getValue("create_at"), "yyyy/MM/dd HH:mm:ss")}
        </>
      );
    },
  },
  {
    accessorKey: "update_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          更新
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const original = row.original;
      return (
        <>
          {GetDateTimeFormat(row.getValue("update_at"), "yyyy/MM/dd HH:mm:ss")}
        </>
      );
    },
  },
];
