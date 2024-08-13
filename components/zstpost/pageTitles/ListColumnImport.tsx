"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeImportTitle } from "@/app/types/title";
import { useEffect, useRef, useState } from "react";

export const columnsImport: ColumnDef<TypeImportTitle>[] = [
  {
    accessorKey: "insert",
    header: ({ table }) => {
      const checkboxRef = useRef<HTMLInputElement>(null);
      const isAllSelected = table.getIsAllPageRowsSelected();
      const isSomeSelected = table.getIsSomePageRowsSelected();

      useEffect(() => {
        if (checkboxRef.current) {
          checkboxRef.current.indeterminate = isSomeSelected && !isAllSelected;
        }
      }, [isAllSelected, isSomeSelected]);

      return (
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={isAllSelected}
          onChange={() => table.toggleAllPageRowsSelected(!isAllSelected)}
        />
      );
    },
    cell: ({ row }) => {
      // 各行のチェックボックス
      return (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      );
    },
  },
  {
    accessorKey: "state",
    header: "状況",
  },
  {
    accessorKey: "title",
    header: "タイトル",
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
      return (
        <>
          {row.getValue("create_at") !== undefined
            ? String(row.getValue("create_at"))
            : ""}
        </>
      );
    },
  },
];
