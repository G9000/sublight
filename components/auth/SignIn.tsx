import { useState } from "react";
import { useRouter } from "next/router";
import { useSignInEmailPassword } from "@nhost/nextjs";
import Link from "next/link";
import Image from "next/image";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    signInEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignInEmailPassword();

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signInEmailPassword(email, password);
  };

  if (isSuccess) {
    router.push("/");
    return null;
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <div>
      <div>
        {needsEmailVerification ? (
          <p>
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
        ) : (
          <>
            <form onSubmit={handleOnSubmit}>
              <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableForm}
                required
              />
              <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disableForm}
                required
              />

              <button type="submit" disabled={disableForm}>
                {isLoading ? "Loading" : "Sign in"}
              </button>

              {isError ? <p>{error?.message}</p> : null}
            </form>
          </>
        )}
      </div>

      <p>
        No account yet?{" "}
        <Link href="/sign-up">
          <a>Sign up</a>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
