import AuthButton from "@/components/AuthButton";
import { ConnectBtn } from "@/components/ConnectBtn";
import { Tutorial } from "@/components/Tutorial";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  let printedMetadata = user.user_metadata;
  if (!printedMetadata.wallet_address)
    printedMetadata.wallet_address = "N/A - Need to connect thirdweb";

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
        <div className="mt-10 pl-10">
          <ConnectBtn />
        </div>{" "}
        <Tutorial />
        <div className="mt-10 pl-10 border">
          <div>User metadata:</div>
          <pre className="max-w-[90vw] max-h-[600px] overflow-auto">
            {JSON.stringify(printedMetadata, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
