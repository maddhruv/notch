import NProgress from "nprogress";
import Router from "next/router";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import AppBar from "../components/AppBar";
import Container from "../components/Container";
import { DarkModeProvider } from "../components/DarkMode";

import "../styles/globals.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <AppBar
        title={pageProps?.siteConfig?.name}
        logo={pageProps?.siteConfig?.logo}
      />
      <Container>
        <Component {...pageProps} />
      </Container>
    </DarkModeProvider>
  );
}

export default MyApp;
