import React from "react";
import { useSignOut, useUserData } from "@nhost/nextjs";

export function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useSignOut();
  const user = useUserData();

  return (
    <div className="bg-gray-100 min-h-screen h-full flex flex-col w-full">
      {user && (
        <header className="w-full px-10 py-6 flex justify-between items-center mb-16">
          <div className="text-gray-600 text-4xl font-bold">STOR</div>
          <div>
            <button
              onClick={signOut}
              className="bg-gray-200 py-2 px-6 text-gray-400"
            >
              Sign Out
            </button>
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
