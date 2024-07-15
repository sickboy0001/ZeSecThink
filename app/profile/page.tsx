"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { isSuperUser } from "@/lib/user";
import { getUtilUser } from "../actions/user/utilUser";
import { User } from "../types/user";

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
      <h1 className="text-2xl font-bold">ログインに成功しました</h1>
      {nowUser ? (
        <div>
          <p>ユーザー: {nowUser.email}</p>
          <p>管理者: {String(nowUser.isSuperUser)}</p>

          {/* 他のユーザー情報 */}
        </div>
      ) : (
        <p>ユーザー情報を取得中...</p>
      )}
      <div className="pt-10">
        <form action="/auth/logout" method="post">
          <button
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            ログアウト
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
