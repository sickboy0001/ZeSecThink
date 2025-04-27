"use client";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateZstPost } from "@/app/actions/zstPosts/posts";

import { useRouter } from "next/navigation";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";

interface propTypes {
  zstPost: TypeZstPostWithTags;
  showModal: Dispatch<SetStateAction<boolean>>;
  putZstPosts?: (posts: TypeZstPostWithTags, actionType: string) => void;
}

const ModalZstPostEdit = (props: propTypes) => {
  const { showModal, zstPost, putZstPosts } = props;

  const [formData, setFormData] = useState<TypeZstPostWithTags>({
    // 初期値を指定
    ...zstPost, //上書き
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // 変更された入力値
    const { name, value } = e.target;
    // 入力フォーム情報にセットする
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log("--------------handleSubmit");
    const updatedPost = await updateZstPost({
      params: {
        ZstPost: formData,
      },
    });
    showModal(false);
    // ★ updateZstPost が成功し、有効なデータを返した場合
    if (updatedPost) {
      // ★ putZstPosts が渡されていれば実行
      if (putZstPosts) {
        // ★ TypeZstPostWithTags 型に変換して渡す (元の tagIds を引き継ぐ)
        const postToUpdateState: TypeZstPostWithTags = {
          ...updatedPost, // updateZstPost から返された最新の基本情報
          tagIds: zstPost.tagIds, // ★ 元の zstPost prop から tagIds を取得して追加
        };
        console.log("Calling putZstPosts with:", postToUpdateState);
        putZstPosts(postToUpdateState, "update"); // ★ 変換後のデータを渡す
      }
      showModal(false); // 成功時にモーダルを閉じる
    } else {
      // ★ updateZstPost が null や undefined を返した場合のエラー処理
      console.error("Update failed: updateZstPost returned null or undefined.");
      // 必要に応じてユーザーにエラーメッセージを表示
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-1">
      <div className="py-1">
        <Label
          // htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          タイトル
        </Label>
        <Input
          type="title"
          name="title"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="タイトル"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label
          // htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          内容
        </Label>
        <Textarea
          name="content"
          id="content"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="内容"
          value={formData.content}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleChange(event)
          }
          rows={7}
          required
        />
      </div>
      <div>
        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          更新
        </button>
      </div>
      {/* <pre>{propsstring}</pre> */}
    </form>
  );
};

export default ModalZstPostEdit;
