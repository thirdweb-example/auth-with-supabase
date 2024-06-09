"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { generatePayload, isLoggedIn, login, logout } from "@/app/actions/auth";

export const ConnectBtn = () => {
  return (
    <ConnectButton
      autoConnect={true}
      client={client}
      signInButton={{ label: "Step 2: Log in with thirdweb" }}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};
