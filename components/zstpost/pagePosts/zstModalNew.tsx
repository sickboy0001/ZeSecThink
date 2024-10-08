"use client";
import { TypeZstPost } from "@/app/types/zstTypes";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { createZstPost } from "@/app/actions/zstPosts/posts";
import { GetDateTimeFormat, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import { Button } from "@/components/ui/button";
import UserContext from "@/components/user/UserContext";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import ModalQuotationList from "../pageTitles/ModalQuotationList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface propTypes {
  date: Date;
  showModal: Dispatch<SetStateAction<boolean>>;
}

const getIntervalDotString = (basedate: Date) => {
  const elapsedTimeMs = new Date().getTime() - basedate.getTime();
  // 経過時間を秒に変換し、10秒単位で丸める
  const interval = Math.floor(elapsedTimeMs / 1000 / 10) * 10;

  const dotString = ["", ".", "..", "...", "...."];
  const currentDots = dotString[new Date().getSeconds() % dotString.length];

  return [interval, currentDots];
};

const ZstModalNew = (props: propTypes) => {
  const { showModal, date } = props;
  const [timestring, setTimestring] = useState("");
  const [openTime, setOpenTIme] = useState(new Date());

  const [open, setOpen] = useState(false);

  const router = useRouter();
  // const [text, setText] = useState<string>("");

  // const [nowUser, setNowUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<TypeZstPost | null>(null);

  const user = useContext(UserContext);

  useEffect(() => {
    window.setInterval(() => {
      const [interval, currentDots] = getIntervalDotString(openTime);
      setTimestring("[" + String(interval) + "sec" + currentDots + "]");
    }, 1000);
  }, []);

  useEffect(() => {
    if (user || date) {
      setFormData({
        id: 0,
        user_id: user?.userid || 0, // nowUserがnullでないことを確認 nullでも０で作ること
        // current_at: new Date(
        //   format(toZonedTime(date, timeZone), "yyyy-MM-dd 00:00:00000")
        // ),
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
  }, [user, date]);

  if (!formData) {
    return <div>now loading...</div>; // or a loading spinner or some placeholder
  }

  const setText = (text: string | any) => {
    setFormData((prevFormData) => {
      if (!prevFormData) return prevFormData;
      return { ...prevFormData, title: text };
    });
  };

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

  const datebase = GetyyyyMMddJpFromDate(date);

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (formData != null) {
      formData.write_end_at = new Date();
      formData.create_at = new Date();
      formData.update_at = new Date();

      const writeStartAt =
        formData.write_start_at instanceof Date
          ? formData.write_start_at
          : new Date();
      const writeEndAt =
        formData.write_end_at instanceof Date
          ? formData.write_end_at
          : new Date();

      var diffMilliSec = writeEndAt.getTime() - writeStartAt.getTime();
      var diffsec = Math.floor(diffMilliSec / 1000); // Math.floor を使用して整数に切り捨て

      // console.log(diffsec);
      formData.second = diffsec;
      await createZstPost({
        params: {
          ZstPost: formData,
        },
      });
    }
    showModal(false);
    router.push(`/zstPosts/view/day/?date=${datebase}`);
    window.location.reload(); // ページを再読み込みして最新のデータを取得する
  }

  return (
    <div>
      {GetDateTimeFormat(new Date(), "M月d日") !==
      GetDateTimeFormat(date, "M月d日") ? (
        <div>
          <Label className="block mb-1 text-sm  text-red-800 font-extrabold">
            今日以外（{GetDateTimeFormat(date, "M月d日")}）への追加です。
          </Label>
        </div>
      ) : null}
      <form onSubmit={handleSubmit} method="post" className="space-y-1">
        <div>
          <Label className="block mb-1 text-sm font-medium text-gray-900">
            タイトル
          </Label>
          <div className="flex">
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="mx-1"
                  variant="outline"
                  size="icon"
                  tabIndex={-1}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              {open && (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Title Quotation</DialogTitle>
                  </DialogHeader>
                  <DialogDescription></DialogDescription>
                  <ModalQuotationList
                    userid={user?.userid ?? 0}
                    setText={setText}
                    setOpen={setOpen}
                  ></ModalQuotationList>
                </DialogContent>
              )}
            </Dialog>
          </div>
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
            onChange={handleChange}
            rows={7}
            required
          />
        </div>
        <div>
          <Button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            更新
            <span className="px-2 w-6 text-left font-mono">{timestring}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ZstModalNew;
