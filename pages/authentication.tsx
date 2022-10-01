import Head from "next/head";
import { AuthenticationBox } from "@/components/auth/AuthenticationBox";

const SignInPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="max-w-[325px] w-full">
        <AuthenticationBox />
      </div>
    </div>
  );
};

export default SignInPage;
