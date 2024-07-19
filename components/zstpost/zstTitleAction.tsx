"use client";

import { TypeZstPost } from "@/app/types/zstTypes";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GetFormatTz } from "@/lib/utilsDate";
import { updateFlgZstPost } from "@/app/actions/zstPosts/posts";
import ZstTitle from "./zstTitle";
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
            </div>
          </div>
        </div>
      </ZstTitle>
    </>
  );
};

export default zstTitleAction;
