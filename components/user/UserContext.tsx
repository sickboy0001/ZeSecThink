"use client";
// UserContext.tsx
import { User } from "@/app/types/user";
import React, { createContext, ReactNode } from "react";

const UserContext = createContext<User | null>(null);

export default UserContext;

type Props = {
  children: ReactNode;
  user: User;
};

// コンテキストのProviderを呼び出すクライアントコンポーネントを作成する
export function UserProvider({ children, user }: Props) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
