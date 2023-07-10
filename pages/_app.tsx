import { GlobalProvider } from "@/src/contexts/GlobalProvider";
import Layout from "@/src/templates/layout";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useContext } from "react";

import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>TESTE NATY</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </GlobalProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
