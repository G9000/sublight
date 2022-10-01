import styles from "../styles/components/SignUp.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSignUpEmailPassword } from "@nhost/nextjs";
import Link from "next/link";
import Image from "next/image";

const SignUp = () => {
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
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["logo-wrapper"]}>
          <Image src="/logo.svg" alt="logo" layout="fill" objectFit="contain" />
        </div>

        {needsEmailVerification ? (
          <p className={styles["verification-text"]}>
            Please check your mailbox and follow the verification link to verify
            your email.
          </p>
        ) : (
          <form onSubmit={handleOnSubmit} className={styles.form}>
            <div className={styles["input-group"]}>
              <input
                placeholder="first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={disableForm}
                required
              />
              <input
                placeholder="last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={disableForm}
                required
              />
            </div>
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

            <button
              type="submit"
              disabled={disableForm}
              className={styles.button}
            >
              {isLoading ? "Loading" : "Create account"}
            </button>

            {isError ? (
              <p className={styles["error-text"]}>{error?.message}</p>
            ) : null}
          </form>
        )}
      </div>

      <p className={styles.text}>
        Already have an account?{" "}
        <Link href="/sign-in">
          <a className={styles.link}>Sign in</a>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
