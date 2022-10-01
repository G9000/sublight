import type { NextPage } from "next";
import Head from "next/head";
import withAuth from "@/components/auth/with-auth";


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Stor dashboard</title>
        <meta name="description" content="Stor dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <div className="text-gray-100">{user?.metadata?.firstName}</div> */}
      </main>
    </div>
  );
};

export default withAuth(Home);
