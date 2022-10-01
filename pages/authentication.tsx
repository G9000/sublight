import Head from "next/head";
import { AuthenticationBox } from "@/components/auth/AuthenticationBox";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="max-w-[325px] mx-auto">
        <AuthenticationBox />
      </div>
    </>
  );
};

export default SignInPage;
