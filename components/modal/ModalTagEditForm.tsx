"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { TypeTagMas } from "@/app/types/tagTypes";
import { Switch } from "../ui/switch";
import { updateTagMas } from "@/app/actions/Tag/TagMas";

// import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";

interface propTypes {
  tagMas: TypeTagMas;
  showModal: Dispatch<SetStateAction<boolean>>;
  onTagUpdated: (updatedTag: TypeTagMas) => void; // コールバック関数を追加
}

const ModalTagEditForm = (props: propTypes) => {
  const { showModal, tagMas, onTagUpdated } = props;
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
    // console.log(e.target.name + e.target.value);
    const { name, value } = e.target;
    // 入力フォーム情報にセットする
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSwitchChange = (checked: boolean, name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log("--------------handleSubmit");

    // update data
    const result = await updateTagMas(
      Number(tagMas.id), // 更新対象の tagMas の ID
      formData.tag_name,
      formData.name,
      formData.description,
      formData.visible_flg,
      formData.favorite_flg,
      formData.public_flg,
    );

    if (result && !result.error) {
      console.log("タグを更新しました:", result);
      onTagUpdated(result as TypeTagMas);
      showModal(false); // モーダルを閉じる
      // router.refresh(); // データの再取得をトリガー (Next.js の機能)
    } else {
      console.error("タグの更新に失敗しました:", result?.error);
      // 更新失敗時の処理 (例: エラーメッセージ表示)
    }
  }

  return (
    <form onSubmit={handleSubmit} method="post" className="space-y-1">
      <div className="py-1">
        <Label
          // htmlFor="email"
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          tag_name
        </Label>
        <Input
          type="tag_name"
          name="tag_name"
          id="tag_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="タイトル"
          value={formData.tag_name}
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
        />
      </div>
      <div className="flex items-center space-x-6">
        {/* Flexbox コンテナ */}
        <div className="flex items-center space-x-2">
          <Switch
            id="visible_flg"
            name="visible_flg"
            checked={formData.visible_flg || false}
            onCheckedChange={(checked) =>
              handleSwitchChange(checked, "visible_flg")
            }
          />
          <Label
            htmlFor="visible_flg"
            className="block text-sm font-medium text-gray-900"
          >
            表示
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="favorite_flg"
            name="favorite_flg"
            checked={formData.favorite_flg || false}
            onCheckedChange={(checked) =>
              handleSwitchChange(checked, "favorite_flg")
            }
          />
          <Label
            htmlFor="favorite_flg"
            className="block text-sm font-medium text-gray-900"
          >
            お気に入り
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="public_flg"
            name="public_flg"
            checked={formData.public_flg || false}
            onCheckedChange={(checked) =>
              handleSwitchChange(checked, "public_flg")
            }
          />
          <Label
            htmlFor="public_flg"
            className="block text-sm font-medium text-gray-900"
          >
            公開
          </Label>
        </div>
      </div>
      <div>
        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center">
          更新
        </button>
      </div>
      {/* <pre>{propsstring}</pre> */}
    </form>
  );
};

export default ModalTagEditForm;
