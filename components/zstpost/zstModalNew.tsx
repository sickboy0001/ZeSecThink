"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { User } from "@/app/types/user";
import { createZstPost } from "@/app/actions/zstPosts/posts";

interface propTypes {
  date: Date;
  showModal: Dispatch<SetStateAction<boolean>>;
}

const ZstModalNew = (props: propTypes) => {
  const { showModal, date } = props;
  const [showEdit, setShowEdit] = useState(false);
  const router = useRouter();

  const [nowUser, setNowUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<TypeZstPost | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUtilUser();
      if (user) {
        setNowUser({
          ...user,
          userid: user.userid || 0, // userid が undefined の場合は 0 にする
        });
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (nowUser) {
      setFormData({
        id: 0,
        user_id: nowUser.userid || 0, // nowUserがnullでないことを確認
        current_at: date,
        title: "",
        content: "",
        second: 120,
        public_flg: false,
        public_content_flg: false,
        delete_flg: false,
        write_start_at: new Date(),
        write_end_at: new Date(),
        create_at: new Date(),
        update_at: new Date(),
      });
    }
  }, [nowUser, date]);
  if (!formData) {
    return null; // or a loading spinner or some placeholder
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    // 変更された入力値
    const { name, value } = e.target;
    // 入力フォーム情報にセットする
    setFormData((prevFormData) => {
      if (!prevFormData) return prevFormData;
      return { ...prevFormData, [name]: value };
    });
  };

  const propsstring = JSON.stringify({ formData }, null, 2);

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log("--------------handleSubmit/new");
    // todo20240714;
    if (formData != null) {
      formData.write_end_at = new Date();
      formData.create_at = new Date();
      formData.update_at = new Date();

      createZstPost({
        params: {
          ZstPost: formData,
        },
      });
    }
    router.push("/zstPosts/view/grid");
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
          onChange={handleChange}
          rows={7}
          required
        />
      </div>
      <div>
        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          更新
        </button>
      </div>
      <pre>{propsstring}</pre>
    </form>
  );
};

export default ZstModalNew;
