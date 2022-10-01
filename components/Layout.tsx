import React from "react";
import { useSignOut } from "@nhost/nextjs";
import { useUserContext } from "@/providers/user-provider";

export function Layout({ children = null }) {
  // const { user } = useUserContext();
  const { signOut } = useSignOut();

  return (
    <div>
      <header>
        <button onClick={signOut}>Logout</button>
      </header>

      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}
