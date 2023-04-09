import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider as JotaiProvider } from "jotai";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <JotaiProvider>
        <Head>
          <title>Next.js, Three.js Sandbox App</title>
          <meta name="description" content="t3-threejs-sandbox-app" />
          <link rel="icon" href="/alphabet.svg" />
        </Head>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </JotaiProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
