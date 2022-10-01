import Head from "next/head";
import SignIn from "@/components/auth/SignIn";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign in - Nhost</title>
      </Head>

      <div>
        <SignIn />
      </div>
    </>
  );
};

export default SignInPage;
