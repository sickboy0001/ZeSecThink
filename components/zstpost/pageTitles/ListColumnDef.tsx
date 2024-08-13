"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeZstTitle } from "@/app/types/title";

export const columns: ColumnDef<TypeZstTitle>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "comment",
    header: "comment",
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          更新日
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const original = row.original;
      return <>{String(row.getValue("create_at"))}</>;
    },
  },
];
