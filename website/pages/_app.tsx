import { SideNav } from "@/components";
import { Page } from "@/layouts";
import { ChakraProvider, Container } from "@chakra-ui/react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/700.css";
import type { AppProps } from "next/app";
import theme from "../theme";

// -webkit-font-smoothing: antialiased;
// font-feature-settings: "liga","clig";
// font-variant-ligatures: common-ligatures;
// font-weight: 400;
// letter-spacing: -.004em;
// line-height: 1;
// text-rendering: optimizeLegibility;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container
        // wrapper
        as="main"
        maxW="container.lg"
        className="wrapper"
        sx={{
          display: { sm: "flex", md: "grid" },
          flexDir: "column",
          gap: 4,
          padding: 4,
          mx: "auto",
          gridTemplateColumns: { sm: "auto", md: "1fr 2fr" },
        }}
      >
        <SideNav />
        <Page
          title="Chakra UI Steps"
          metaDescription="Steps component designed to work with Chakra UI"
          description="Chakra UI Steps makes it super easy to create multi-step interfaces in apps where you are already using Chakra UI. Use it in forms, onboarding, or anywhere you want to lead the user through some logical steps."
        >
          <Component {...pageProps} />
        </Page>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
