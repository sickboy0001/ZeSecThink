"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getLogicalFilename } from "@/components/clientWordCloud/clientWordCloud";
import { GetLogicalPhysicalUid } from "@/app/actions/storageFilename/LogicalPhysicalUid";
import { uploadedPublicUrl } from "@/app/actions/storage/upload";

interface propsType {
  thisApiType: string;
  publicFlg: number;
  userid: number;
  fromAtString: string;
  toAtString: string;
  setIsExistImageFile: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImageAt: React.Dispatch<React.SetStateAction<Date>>;
}

const checkIfFileExists = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "HEAD", // ファイルの存在確認だけを行うためにHEADリクエストを使用
    });

    if (response.ok) {
      // console.log("PNGファイルが存在します:", url);
      return true; // ファイルが存在する
    } else {
      // console.log("PNGファイルが存在しません:", url);
      return false; // ファイルが存在しない
    }
  } catch (error) {
    // console.error("エラーが発生しました:", error);
    return false; // エラーが発生した場合も存在しないと判断
  }
};

const ExistImageFile = (props: propsType) => {
  const {
    thisApiType,
    publicFlg,
    userid,
    fromAtString,
    toAtString,
    setIsExistImageFile,
    setCreateImageAt,
  } = props;
  // const data = prop.data;
  const [existImageUrl, setExistImageUrl] = useState("");

  useEffect(() => {
    // クライアントサイドでのマウント後にフラグをtrueに設定
    const fetch = async () => {
      const logical_filename = getLogicalFilename(
        thisApiType,
        publicFlg,
        userid,
        fromAtString,
        toAtString
      );
      //Table登録されているかの確認
      console.log("3cloud:logical_filename:", logical_filename);
      const thisUid = await GetLogicalPhysicalUid(logical_filename);

      if (!thisUid) {
        console.error("Exist-Logical to physical UID mapping not found.");
        setIsExistImageFile(false);
        return;
      }
      //パスの作成
      const filepathname = thisUid.dir + "/" + thisUid.physical_filename;
      setCreateImageAt(thisUid.create_at);

      // console.log("const 3cloud : filepathname:", filepathname);
      //Storageあるかどうかの確認
      const path = await uploadedPublicUrl(filepathname);

      // console.log("const 3cloud : urlpath:", path);
      setExistImageUrl(path);
      setIsExistImageFile(true);
    };
    console.log("const ExistImageFile start");
    fetch();
  }, [thisApiType, publicFlg, userid, fromAtString, toAtString]);

  return (
    <div>
      {existImageUrl ? (
        <Image
          src={existImageUrl}
          alt="Supabase Image"
          width={500}
          height={400}
          priority
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default ExistImageFile;
