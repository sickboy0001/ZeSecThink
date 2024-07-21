import React from "react";
import { getUtilUser } from "@/app/actions/user/utilUser";
import ICsvPageUpdateConfirm from "@/components/importcsv/ICsvPage";

interface propsType {
  searchParams:
    | {
        [key: string]: string | string[] | undefined | any;
      }
    | any;
}

const SelectFile = async ({ searchParams }: propsType) => {
  console.log(searchParams);
  // searchParams.basedateの取得
  let date = String(searchParams.date || "");
  // const [nowUser, setNowUser] = useState<User | null>(null);
  const user = await getUtilUser();

  return (
    <>
      <div>
        <ICsvPageUpdateConfirm></ICsvPageUpdateConfirm>
      </div>
      <div>
        user.userid:{user?.id}:{user?.userid}:{user?.username}
      </div>
    </>
  );
};

export default SelectFile;
