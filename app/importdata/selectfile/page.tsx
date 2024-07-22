import React from "react";
import { getUtilUser } from "@/app/actions/user/utilUser";
import ICsvPage from "@/components/importcsv/ICsvPage";

const SelectFile = async () => {
  // console.log(searchParams);
  // searchParams.basedateの取得
  // const [nowUser, setNowUser] = useState<User | null>(null);
  const user = await getUtilUser();

  return (
    <>
      {/* <UserContext.Provider value={user}> */}
      <div>
        <ICsvPage></ICsvPage>
      </div>
      <div>
        user.userid:{user?.id}:{user?.userid}:{user?.username}
      </div>
      {/* </UserContext.Provider> */}
    </>
  );
};

export default SelectFile;
