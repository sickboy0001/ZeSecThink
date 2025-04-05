"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import { TypeTagMas } from "@/app/types/tagTypes";
// import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";

interface propTypes {
  tagMas: TypeTagMas;
  showModal: Dispatch<SetStateAction<boolean>>;
}

const ModalEdit = (props: propTypes) => {
  const { showModal, tagMas } = props;
  //   const [showEdit, setShowEdit] = useSFtate(false);
  const router = useRouter();

  const [formData, setFormData] = useState<TypeTagMas>({
    // 初期値を指定
    ...tagMas, //上書き
  });

  const propsstring = JSON.stringify({ formData }, null, 2);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // 変更された入力値
    console.log(e.target.name + e.target.value);
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
    // update data
    // updateZstPost({
    //   params: {
    //     ZstPost: formData,
    //   },
    // });
    // const datebase = GetyyyyMMddJpFromDate(formData.current_at);
    // router.push(`/zstPosts/view/day/?date=${datebase}`);
    // window.location.reload(); // ページを再読み込みして最新のデータを取得する
    showModal(false);
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-1">
      <div className="py-1">
        <Label
          // htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          tagName
        </Label>
        <Input
          type="tagName"
          name="tagName"
          id="tagName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="タイトル"
          value={formData.tagName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="py-1">
        <Label className="block mb-1 text-sm font-medium text-gray-900">
          name
        </Label>
        <Input
          type="name"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="タイトル"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label
          // htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          tagName
        </Label>
        <Textarea
          name="description"
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="説明"
          value={formData.description}
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

export default ModalEdit;
