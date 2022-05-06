import { SideNav } from "@/components";
import { Page } from "@/layouts";
import { ChakraProvider, Container } from "@chakra-ui/react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/700.css";
import type { AppProps } from "next/app";
import theme from "../theme";

const SIDEBAR_WIDTH = "300px";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container
        // wrapper
        maxW="container.lg"
        className="wrapper"
        sx={{
          display: { sm: "flex", md: "grid" },
          flexDir: "column",
          gap: 4,
          padding: 4,
          mx: "auto",
          gridTemplateColumns: `300px minmax(0, 1fr)`,
          minWidth: 0,
        }}
      >
        <SideNav />
        <Page
          title="Chakra UI Steps"
          metaDescription="Steps component designed to work seamlessly with Chakra UI"
          description="Chakra UI Steps makes it super easy to create multi-step interfaces in apps where you are already using Chakra UI. Use it in forms, onboarding, or anywhere you want to lead the user through some logical steps."
        >
          <Component {...pageProps} />
        </Page>
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
