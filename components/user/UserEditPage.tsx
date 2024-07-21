import { useContext, useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UserContext from "./UserContext";
import { registUserInfo } from "@/app/actions/user/edit";
import { useRouter } from "next/navigation";

export default function UserEditPage() {
  const user = useContext(UserContext);
  const [name, setName] = useState(user?.username);
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(() => {
    setName(user?.username);
    setComment(user?.comment || "");
  }, [user]);

  console.log("export default function UserEditPage:", user);
  const actionForm = (formData: FormData) => {
    console.log("const actionForm = ()");
    const username = formData.get("name") as string;
    const mail = formData.get("mail") as string;
    const comment = formData.get("comment") as string;

    const log = `userid:${String(
      user?.userid
    )} mail:${mail} username:${username} comment:${comment} `;
    console.log(log);

    try {
      registUserInfo(user?.userid ?? 0, username, comment);
    } catch (error) {
      console.log("const actionForm = (formData: FormData):", error);
    }

    router.push("/");
  };
  return (
    <>
      <div className="w-96 mx-auto  px-4  pb-16 pt-20 ">
        <div className="h-2 py-4">ユーザー情報更新</div>

        <form action={actionForm} className="space-y-4">
          <div>
            <Label
              // htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            ></Label>
            <Label
              htmlFor="mail"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              mail
            </Label>
            <Input
              type="mail"
              name="mail"
              id="mail"
              value={user?.email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              name
            </Label>
            <Input
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <Label
              htmlFor="comment"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              comment
            </Label>
            <Textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            ></Textarea>
          </div>
          <div>
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              更新
            </button>
          </div>
        </form>
      </div>{" "}
    </>
  );
}
