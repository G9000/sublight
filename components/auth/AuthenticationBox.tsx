import { useState } from "react";
import { useRouter } from "next/router";
import { useSignInEmailPassword, useSignUpEmailPassword } from "@nhost/nextjs";
import clsx from "clsx";

enum AuthTabs {
  SIGN_IN = "Sign In",
  SIGN_UP = "Sign Up",
}

export function AuthenticationBox() {
  const [activeTab, setActiveTab] = useState(AuthTabs.SIGN_IN);
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-600 text-center">STOR</h1>
      <div className="mt-4">
        {activeTab === AuthTabs.SIGN_IN ? <SignIn /> : <SignUp />}
      </div>
      <p className="text-center text-gray-400 mt-10">
        {activeTab === AuthTabs.SIGN_UP
          ? "Already have an account?"
          : "No account yet?"}{" "}
        <button
          onClick={() =>
            setActiveTab(
              activeTab === AuthTabs.SIGN_IN
                ? AuthTabs.SIGN_UP
                : AuthTabs.SIGN_IN
            )
          }
        >
          <a>
            {activeTab === AuthTabs.SIGN_UP
              ? AuthTabs.SIGN_IN
              : AuthTabs.SIGN_UP}
          </a>
        </button>
      </p>
    </div>
  );
}

function SignIn() {
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
    <div className="text-center">
      <div>
        {needsEmailVerification ? (
          <p className="text-emerald-400">
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
        ) : (
          <>
            <form onSubmit={handleOnSubmit} className="mt-4">
              <div className="bg-gray-200 h-[45px]">
                <input
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={disableForm}
                  type="email"
                  required
                  className="bg-transparent pl-4 h-full w-full  text-gray-500"
                />
              </div>

              <div className="bg-gray-200 h-[45px] mt-4">
                <input
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={disableForm}
                  type="password"
                  required
                  className="bg-transparent pl-4 h-full w-full text-gray-500"
                />
              </div>
              {isError ? (
                <p className="mt-2 text-rose-500">{error?.message}</p>
              ) : null}

              <button
                type="submit"
                disabled={disableForm}
                className="text-gray-50 py-2 px-8 bg-orange-600 mt-10"
              >
                {isLoading ? "Loading" : "Sign in"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification,
    isError,
    error,
  } = useSignUpEmailPassword();

  const handleOnSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await signUpEmailPassword(email, password, {
      displayName: `${firstName} ${lastName}`.trim(),
      metadata: {
        firstName,
        lastName,
      },
    });
  };

  if (isSuccess) {
    router.push("/");
    return null;
  }

  const disableForm = isLoading || needsEmailVerification;

  return (
    <div className="text-center">
      <div>
        {needsEmailVerification ? (
          <div className="text-emerald-500 border p-4 rounded-xl bg-gray-200 bg-opacity-25">
            <h3 className="text-lg font-bold">🥳 Congratulation</h3>
            <p className="mt-4">
              Please check your mailbox and follow the verification link to
              verify your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleOnSubmit}>
            <div>
              <div className="bg-gray-200 h-[45px] mt-4">
                <input
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={disableForm}
                  type="text"
                  required
                  className="bg-transparent pl-4 h-full w-full  text-gray-500"
                />
              </div>

              <div className="bg-gray-200 h-[45px] mt-4">
                <input
                  placeholder="last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={disableForm}
                  type="text"
                  required
                  className="bg-transparent pl-4 h-full w-full  text-gray-500"
                />
              </div>
            </div>
            <div className="bg-gray-200 h-[45px] mt-4">
              <input
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disableForm}
                type="email"
                required
                className="bg-transparent pl-4 h-full w-full  text-gray-500"
              />
            </div>

            <div className="bg-gray-200 h-[45px] mt-4">
              <input
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disableForm}
                type="password"
                required
                className="bg-transparent pl-4 h-full w-full  text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={disableForm}
              className="text-gray-50 py-2 px-8 bg-orange-600 mt-10"
            >
              {isLoading ? "Loading" : "Create account"}
            </button>

            {isError ? (
              <p className="mt-2 text-rose-500">{error?.message}</p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
