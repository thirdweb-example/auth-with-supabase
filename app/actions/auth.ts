"use server";
import { VerifyLoginPayloadParams } from "thirdweb/auth";
import { cookies } from "next/headers";
import { thirdwebAuth } from "@/components/thirdwebAuth";
import { createClient } from "@/utils/supabase/server";

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  console.log({ payload });
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    console.log({ jwt });
    cookies().set("jwt", jwt);

    // Connect user wallet to Supabase
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("should already logged in supabase");
    }

    if (user.user_metadata.wallet_address) {
      /**
       * What you want to do here is up to you
       */
      throw new Error("Wallet address already linked");
    }

    await supabase.auth.updateUser({
      data: {
        wallet_address: payload.payload.address,
      },
    });
  }
}

export async function isLoggedIn() {
  const jwt = cookies().get("jwt");
  if (!jwt?.value) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  console.log({ authResult });
  if (!authResult.valid) {
    return false;
  }
  return true;
}

export async function logout() {
  cookies().delete("jwt");
}
