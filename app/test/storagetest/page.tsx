import React from "react";

import { getUtilUser } from "@/app/actions/user/utilUser";
import { UserProvider } from "@/components/user/UserContext";
import { User } from "@/app/types/user";
import UpdateStroagePage from "@/components/UpateStorage/UpateStoragePage";
interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const TextAnalyse = async ({ searchParams }: propsType) => {
  const user = await getUtilUser();

  return (
    <>
      <UserProvider user={user as User}>
        <UpdateStroagePage></UpdateStroagePage>
      </UserProvider>
    </>
  );
};

export default TextAnalyse;
