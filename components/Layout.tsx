import React from "react";
import { useSignOut } from "@nhost/nextjs";
import { useUserContext } from "@/providers/user-provider";

export function Layout({ children }: { children: React.ReactNode }) {
  // const { user } = useUserContext();
  const { signOut } = useSignOut();

  return (
    <div className="bg-gray-100 min-h-screen h-full flex flex-col w-full justify-center items-centers">
      {/* <header>
          <button onClick={signOut}>Logout</button>
        </header> */}

      <main>{children}</main>
    </div>
  );
}
