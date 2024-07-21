import { getUtilUser } from "@/app/actions/user/utilUser";
import Navigation from "./navigation";
import { createClient } from "@/utils/supabase/server";

const SupabaseListener = async () => {
  const supabase = createClient();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await getUtilUser();
  //     setNowUser(user);
  //   };
  //   fetchUser();
  // }, []);
  const user = await getUtilUser();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return <Navigation user={user} />;
};

export default SupabaseListener;
