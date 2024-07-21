"use client";

import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GetFormatTz, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { deleteZstPost, updateFlgZstPost } from "@/app/actions/zstPosts/posts";
import ZstTitle from "./zstTitle";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
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

  async function update_deletepublic_flg(
    fullid: string | undefined,
    checked: boolean
  ) {
    const columnname = fullid?.split("_")[0] + "_" + fullid?.split("_")[1];
    const id = parseInt(fullid?.split("_")[2] ?? "0");
    // console.log("--------------handleSubmit");
    const data = await updateFlgZstPost(id, columnname, checked);
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
  const actionFormPhysicalDeletion = () => {
    console.log("actionFormPhysicalDeletion:id:" + String(zstPost.id));
    const date = zstPost.current_at;
    //delete
    deleteZstPost(zstPost.id);

    const datestr = GetyyyyMMddJpFromDate(date);
    router.push(`/zstPosts/view/day/?date=${datestr}`);
  };

  return (
    <>
      <ZstTitle zstPost={zstPost} isDispDetail={true}>
        <div>
          <div className="text-gray-600/70">
            [{String(nowZstPost.second)}sec] [writing start-end{" "}
            {GetFormatTz(nowZstPost.write_start_at)}-
            {GetFormatTz(nowZstPost.write_end_at)}] [create{" "}
            {GetFormatTz(nowZstPost.create_at)}/update
            {GetFormatTz(nowZstPost.update_at)}]
          </div>
          <div className="flex items-center space-x-2">
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
                    Physical deletion
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
