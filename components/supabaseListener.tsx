import Navigation from "./navigation";
import { createClient } from "@/utils/supabase/server";

const SupabaseListener = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Navigation user={user} />;
};

export default SupabaseListener;
