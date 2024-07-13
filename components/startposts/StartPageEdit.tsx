"use client";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { updateStartPagePost } from "@/app/actions/startPage";
import { useRouter } from "next/navigation";
import { TypeStartPost, TypeStartType } from "@/app/types/types";

type StartPageEditProps = {
  startPageTypeMany: TypeStartType[];
  startPagePost: TypeStartPost;
};

const StartPageEdit: React.FC<StartPageEditProps> = ({
  startPageTypeMany,
  startPagePost,
}) => {
  if (!startPagePost) {
    return <div>Loading...</div>; // 適切なローディングコンポーネント
  }

  console.log("startPageTypeMany", startPageTypeMany);
  console.log("startPagePost.type_id", startPagePost.type_id);
  const def_name = startPageTypeMany.filter(
    (item) => startPagePost.type_id == item.id
  )[0].name;
  console.log(def_name);

  const def_type = startPagePost.type_id;
  const [id, setId] = useState(startPagePost.id);
  const [userid, setUserId] = useState(startPagePost.user_id);
  const [title, setTitle] = useState(startPagePost.title);
  const [content, setContent] = useState(startPagePost.content);
  const [type, setType] = useState(def_name);
  const [publicFlg, setPublicFlg] = useState(startPagePost.public_flg);
  const [deleteFlg, setDeleteFlg] = useState(startPagePost.delete_flg);

  const router = useRouter();

  const { pending } = useFormStatus();

  const propsstring = JSON.stringify(
    {
      id: id,
      userid: userid,
      title: title,
      content: content,
      type: type,
      publicflg: publicFlg,
      deleteflg: deleteFlg,
    },
    null,
    2
  );

  // console.log(startPagePost);

  const onCheckedChange = () => {
    setPublicFlg(!publicFlg);
    console.log("onCheckedChange");
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log("--------------handleSubmit");
    console.log(propsstring);
    const user_id = userid;
    updateStartPagePost({
      params: {
        id: id,
        user_id: user_id,
        title: title,
        content: content,
        public_flg: publicFlg,
        delete_flg: false,
        type: type,
      },
    });
    router.push("/startPosts/list");
  }

  return (
    <>
      <form className="space-y-3 py-7 px-7 w-1/2" onSubmit={handleSubmit}>
        {/* // action="/auth/login" */}
        <div className="flex  items-center">
          <div>
            <Label htmlFor="select_type" className="text-sm font-medium ">
              タイプ
            </Label>
          </div>
          <div className="mx-3">
            <Select value={type} onValueChange={(value) => setType(value)}>
              <SelectTrigger
                id="select_type"
                className="bg-gray-50 border border-gray-300 w-[180px]"
              >
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {startPageTypeMany.map((value, index) => (
                    <SelectItem value={String(value.name)} key={index}>
                      {value.disp_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label
            htmlFor="input_title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            タイトル
          </Label>
          <Input
            // type="email"
            // name="email"
            name="input_title"
            id="input_title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="概要（overview）・・・・"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label
            htmlFor="input_content"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            内容
          </Label>
          <Textarea
            name="input_content"
            id="input_content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="サイインし、ログイン後、日々のゼロ秒思考を「入力」 入力時のデフォルトはPrivateのフラグが付与されています。..."
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 mx-3">
            <Checkbox
              onCheckedChange={(e) => {
                setPublicFlg(!publicFlg);
              }}
              id="check_publicFlg"
              checked={publicFlg}
            />
            {/* onCheckedChange */}
            <label
              htmlFor="check_publicFlg"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              公開
            </label>
          </div>
          <div>
            <Button
              type="submit"
              disabled={pending}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              登録
            </Button>
          </div>
        </div>
      </form>
      <pre>{propsstring}</pre>
    </>
  );
};

export default StartPageEdit;
