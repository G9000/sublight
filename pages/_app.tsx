import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NhostClient, NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { Layout } from "@/components/Layout";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION || "",
});

function MyApp({ Component, pageProps }: AppProps) {
  const { nhostSession } = pageProps as any;
  return (
    <NhostNextProvider nhost={nhost} initial={nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NhostApolloProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
