"use client";

import { useActiveAccount } from "thirdweb/react";

export function Tutorial() {
  const account = useActiveAccount();
  if (!account) return <></>;
  return (
    <div className="pl-10 mt-10">
      Step 3: Auto-update the connected wallet address to the logged in Supabase
      user <br />
      See @root/app/actions/auth.ts {">"} login()
    </div>
  );
}
