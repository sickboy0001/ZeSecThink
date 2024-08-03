"use client";

import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GetDateTimeFormat, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { deleteZstPost, updateFlgZstPost } from "@/app/actions/zstPosts/posts";
import ZstTitle from "./zstTitle";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
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
import { useRouter } from "next/navigation";
import { QuoteCollapseible } from "@/components/ui/QuoteCollapseible";
interface propTypes {
  zstPost: TypeZstPost;
  isDispDetail?: boolean;
}

const zstTitleAction = (props: propTypes) => {
  const { zstPost } = props;
  const [nowZstPost, setNowZstPost] = useState<TypeZstPost>(zstPost);
  const [isCheckedDelete, setIsCheckedDelete] = useState(nowZstPost.delete_flg);
  const [isCheckedPublic, setIsCheckedPublic] = useState(nowZstPost.public_flg);

  const switchPublicRef = useRef<HTMLButtonElement>(null);
  const switchDeleteRef = useRef<HTMLButtonElement>(null);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  // console.log(zstPost.title, zstPost.delete_flg);
  // console.log(
  //   "GetDateTimeFormat(nowZstPost.create_at)",
  //   nowZstPost.create_at,
  //   GetDateTimeFormat(nowZstPost.create_at)
  // );
  async function update_deletepublic_flg(
    fullid: string | undefined,
    checked: boolean
  ) {
    const columnname = fullid?.split("_")[0] + "_" + fullid?.split("_")[1];
    const id = parseInt(fullid?.split("_")[2] ?? "0");
    // console.log("--------------handleSubmit");
    const data = await updateFlgZstPost(id, columnname, checked);
    data[columnname] = checked;
    setNowZstPost(data);
    // console.log("todo:Update", columnname, id, checked);
  }

  const handleSwitchPublicChange = (checked: boolean) => {
    const fullid = switchPublicRef.current?.id;
    update_deletepublic_flg(fullid, checked);
    setIsCheckedPublic(checked);
  };

  const handleSwitchDeleteChange = (checked: boolean) => {
    const fullid = switchDeleteRef.current?.id;
    update_deletepublic_flg(fullid, checked);
    setIsCheckedDelete(checked);
  };
  const actionFormPhysicalDeletion = async () => {
    console.log("actionFormPhysicalDeletion:id:" + String(zstPost.id));
    const date = zstPost.current_at;
    //delete
    await deleteZstPost(zstPost.id);

    const datestr = GetyyyyMMddJpFromDate(date);
    router.push(`/zstPosts/view/day/?date=${datestr}`);
    window.location.reload(); // ページを再読み込みして最新のデータを取得する
  };

  const detailinfo = `[${String(
    nowZstPost.second
  )}sec] [writing start-end:${GetDateTimeFormat(
    nowZstPost.write_start_at
  )}-${GetDateTimeFormat(nowZstPost.write_end_at)}] [create:${GetDateTimeFormat(
    nowZstPost.create_at
  )}/update:${GetDateTimeFormat(nowZstPost.update_at)}]`;

  return (
    <>
      <ZstTitle zstPost={nowZstPost} isDispDetail={true}>
        <div>
          <div className="text-gray-600/70 ">
            {/* todo:20240729 */}
            <QuoteCollapseible
              inputText={detailinfo}
              length={10}
            ></QuoteCollapseible>
          </div>

          <div className="flex flex-wrap  items-center space-x-2">
            <div className="flex ml-2 items-center space-x-2">
              <Switch
                id={`delete_flg_${nowZstPost.id}`}
                checked={isCheckedDelete}
                ref={switchDeleteRef}
                onCheckedChange={(value) => {
                  handleSwitchDeleteChange(value);
                }}
              />
              <Label htmlFor={`delete_flg_${nowZstPost.id}`}>delete</Label>
            </div>
            <div className="flex ml-2 items-center space-x-2">
              <Switch
                id={`public_flg_${nowZstPost.id}`}
                checked={isCheckedPublic}
                ref={switchPublicRef}
                onCheckedChange={(value) => {
                  handleSwitchPublicChange(value);
                }}
              />
              <Label htmlFor={`public_flg_${nowZstPost.id}`}>public</Label>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <TrashIcon className="h-4 w-4" />
                    <div className="hidden md:inline-block">
                      Physical deletion
                    </div>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription asChild>
                      <div className="flex items-center space-x-2">
                        削除します。よろしいですか？
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={actionFormPhysicalDeletion}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </ZstTitle>
    </>
  );
};

export default zstTitleAction;
