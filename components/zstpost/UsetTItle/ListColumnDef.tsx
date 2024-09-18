"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeZstPost } from "@/app/types/zstTypes";
import { GetDateTimeFormat } from "@/lib/utilsDate";

export const columns: ColumnDef<TypeZstPost>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "タイトル",
  },
  {
    accessorKey: "create_at",
    header: "create_at",
    cell: ({ row }) => {
      const original = row.original;
      return (
        <>
          {GetDateTimeFormat(row.getValue("create_at"), "yyyy/MM/dd HH:mm:ss")}
        </>
      );
    },
  },
];
