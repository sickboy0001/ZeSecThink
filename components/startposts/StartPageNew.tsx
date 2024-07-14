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
import { createStartPagePost } from "@/app/actions/startPage";
import { TypeStartType } from "@/app/types/types";

type StartPageNewProps = {
  startPageType: TypeStartType[];
};

const StartPageNew: React.FC<StartPageNewProps> = ({ startPageType }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [publicFlg, setPublicFlg] = useState(false);
  const { pending } = useFormStatus();

  const onCheckedChange = () => {
    setPublicFlg(!publicFlg);
    console.log("onCheckedChange");
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log("--------------handleSubmit");
    const value = JSON.stringify(
      {
        title: title,
        content: content,
        type: type,
        publicflg: publicFlg,
      },
      null,
      2
    );
    console.log(value);
    // export const createStartPagePost = async (user_id:number , title:string , content:string , public_flg:boolean,delete_flg:boolean,type_id:number) =>{
    const user_id = 1;
    createStartPagePost({
      params: {
        user_id: user_id,
        title: title,
        content: content,
        public_flg: publicFlg,
        delete_flg: false,
        type: type,
      },
    });
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
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger
                id="select_type"
                className="bg-gray-50 border border-gray-300 w-[180px]"
              >
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {startPageType.map((value, index) => (
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
            rows={7}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 mx-3">
            <Checkbox onCheckedChange={onCheckedChange} id="check_publicFlg" />
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
      <pre>
        {JSON.stringify(
          {
            title: title,
            content: content,
            type: type,
            publicflg: publicFlg,
          },
          null,
          2
        )}
      </pre>
    </>
  );
};

export default StartPageNew;
