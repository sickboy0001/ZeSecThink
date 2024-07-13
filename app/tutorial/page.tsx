import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";

export default async function Tutorial() {
  return (
    <>
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">1.ConnectSupabaseSteps</h2>

          <ConnectSupabaseSteps></ConnectSupabaseSteps>
          <h2 className="font-bold text-4xl mb-4">2.SignUpUserSteps</h2>
          <SignUpUserSteps></SignUpUserSteps>
          <h2 className="font-bold text-4xl mb-4">3.FetchDataSteps</h2>
          <FetchDataSteps></FetchDataSteps>
        </main>
      </div>
    </>
  );
}
