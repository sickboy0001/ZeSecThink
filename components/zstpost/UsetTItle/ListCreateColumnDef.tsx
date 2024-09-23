"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GetDateTimeFormat } from "@/lib/utilsDate";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  removeUserTitle,
  updateUserSampleTitle,
} from "@/app/actions/zstPosts/usetTitle";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { LockOpen2Icon } from "@radix-ui/react-icons";
import { useRef } from "react";

const handleRemoveUserTitles = async (id: number) => {
  //   const result = await selectRandomTitleSample(count);
  await removeUserTitle(id);
};

const updateFlg = async (id: number, columnname: string, value: number) => {
  const data = await updateUserSampleTitle(id, columnname, value);
};

export const ListCreateColumnDef = (readData: () => void): ColumnDef<any>[] => {
  const router = useRouter(); // フックを関数コンポーネント内で呼び出す
  // const switchPublicRef = useRef<HTMLButtonElement>(null);
  // const switchDeleteRef = useRef<HTMLButtonElement>(null);

  async function update_publicinvalid_flg(
    id: number,
    columnname: string,
    value: number
  ) {
    updateFlg(id, columnname, value);
    readData();
  }

  const handleSwitchPublicChange = (id: number, checked: boolean) => {
    const columnname = "public_flg";
    update_publicinvalid_flg(id, columnname, checked ? 1 : 0);
    //update_deletepublic_flg
    // setIsCheckedPublic(checked);
  };

  const handleSwitchinvaiidChange = (id: number, checked: boolean) => {
    const columnname = "invalid_flg";
    update_publicinvalid_flg(id, columnname, checked ? 1 : 0);
    //update_deletepublic_flg
    // setIsCheckedPublic(checked);
  };

  return [
    {
      accessorKey: "public_flg",
      header: "public",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <Switch
            id={`public_flg_${original.id}`}
            checked={original.public_flg > 0}
            // ref={switchPublicRef}
            onCheckedChange={(value) => {
              handleSwitchPublicChange(original.id, value);
            }}
          />
        );
      },
    },
    {
      accessorKey: "invalid_flg",
      header: "invalid",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <Switch
            id={`public_flg_${original.id}`}
            checked={original.invalid_flg > 0}
            // ref={switchPublicRef}
            onCheckedChange={(value) => {
              handleSwitchinvaiidChange(original.id, value);
            }}
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "タイトル",

      cell: ({ row }) => {
        const original = row.original;
        const forecolor =
          original.invalid_flg > 0 ? "text-gray-400" : "text-gray-950";
        return (
          <>
            <div className="font-semibold">
              <div className={`flex ${forecolor}`}>
                {/* {`delete_flg_${nowZstPost.id}`} */}
                {original.public_flg > 0 ? <LockOpen2Icon></LockOpen2Icon> : ""}
                <span className="px-1">{original.name}</span>
              </div>
            </div>
          </>
        );
      },
    },
    {
      accessorKey: "create_at",
      header: "create_at",
      cell: ({ row }) => {
        const original = row.original;
        return (
          <>
            {GetDateTimeFormat(
              row.getValue("create_at"),
              "yyyy/MM/dd HH:mm:ss"
            )}
          </>
        );
      },
    },
    {
      accessorKey: "delete",
      header: "削除",
      cell: ({ row }) => {
        const original = row.original;
        // https://zenn.dev/web_life_ch/articles/95facda4f22e26
        const router = useRouter();
        const onDelete = () => {
          // alert(original.id);
          handleRemoveUserTitles(original.id);

          readData();
        };

        return (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div>
                  <Button
                    className="rounded-lg h-8 px-4  text-sm"
                    variant="destructive"
                  >
                    削除
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    「{original.name}」<br />
                    削除しますか？一度削除したものは復元できません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>削除</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    },
  ];
};
