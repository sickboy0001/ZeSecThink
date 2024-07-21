"use client";
import { useEffect, useState } from "react";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { User } from "@/app/types/user";
import UserEditPage from "@/components/user/UserEditPage";
import UserContext from "@/components/user/UserContext";

/**
 * ログイン後のマイページ
 */
const UserPageEdit = () => {
  const [nowUser, setNowUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUtilUser();
      setNowUser(user);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={nowUser}>
      <UserEditPage></UserEditPage>
    </UserContext.Provider>
  );
};

export default UserPageEdit;
