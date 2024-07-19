"use client";
import { TypeZstContent, TypeZstPost } from "@/app/types/zstTypes";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateZstPost } from "@/app/actions/zstPosts/posts";

import { useRouter } from "next/navigation";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";

interface propTypes {
  zstPost: TypeZstPost;
  showModal: Dispatch<SetStateAction<boolean>>;
}

const ZstModalEdit = (props: propTypes) => {
  const { showModal, zstPost } = props;
  const [showEdit, setShowEdit] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<TypeZstPost>({
    // 初期値を指定
    ...zstPost, //上書き
  });

  const propsstring = JSON.stringify({ formData }, null, 2);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    updateZstPost({
      params: {
        ZstPost: formData,
      },
    });
    const datebase = GetyyyyMMddJpFromDate(formData.current_at);
    router.push(`/zstPosts/view/day/?date=${datebase}`);
    showModal(false);
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-4">
      <div>
        <Label
          // htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          タイトル
        </Label>
        <Input
          type="title"
          name="title"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="タイトル"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label
          // htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          内容
        </Label>
        <Textarea
          name="content"
          id="content"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

export default ZstModalEdit;
