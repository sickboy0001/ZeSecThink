"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { isSuperUser } from "@/lib/user";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { User } from "@/app/types/user";
import UserEditForm from "@/components/user/UserEditForm";

/**
 * ログイン後のマイページ
 */
const MyPage = () => {
  const [nowUser, setNowUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUtilUser();
      setNowUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
      <div>ユーザー情報更新</div>
      <form action="" method="post" className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            name
          </label>
          <input
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            comment
          </label>
          <input
            name="comment"
            id="comment"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            更新
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPage;

{
  /* <div>
        111111111
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          test
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          パスワード
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="text-right">
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={`${location.origin}/resetPassword`}
          onClick={() => showModal(false)}
        >
          パスワードを忘れた場合
        </Link>
      </div>
      <div>
        <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          サインイン
        </button>
      </div> */
}
