import { readTagsByPostId } from "@/app/actions/ZstTagLink/ZstTagLink";
import { TypeTagMas } from "@/app/types/tagTypes";
import { TypeZstPost, TypeZstPostWithTags } from "@/app/types/zstTypes";
import DialogTagLink from "@/components/tags/link/DialogTagLink";
import UserContext from "@/components/user/UserContext";
import React, { useContext, useEffect, useState } from "react";
interface propsType {
  zstPost: TypeZstPostWithTags;
  selectedTagMass: TypeTagMas[];
  setSelectedTagMass: (newTags: TypeTagMas[]) => void;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
}

// 特定の post_id でタグを取得する場合
const TagLink = (props: propsType) => {
  const {
    zstPost,
    selectedTagMass,
    setSelectedTagMass,
    favoriteTagMass,
    normalTagMass,
  } = props;

  // console.log("TagLink", props);

  return (
    <DialogTagLink
      post_id={Number(zstPost.id)}
      post_title={zstPost.title}
      selectedTagMass={selectedTagMass}
      setSelectedTagMass={setSelectedTagMass}
      favoriteTagMass={favoriteTagMass}
      normalTagMass={normalTagMass}
    ></DialogTagLink>
  );
};

export default TagLink;
