import { SideNav } from "@/components";
import { ChakraProvider, Container } from "@chakra-ui/react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/700.css";
import type { AppProps } from "next/app";
import React from "react";
import MobileNav from "../components/MobileNav/MobileNav";
import createFastContext from "../context/createFastContext";
import theme from "../theme";
import { RepoPayload } from "../types";

export type Store = {
  variant: "simple" | "circles" | "circles-alt";
};

const { Provider, useStore } = createFastContext<Store>({
  variant: "simple",
});

export const useVariantContext = () => useStore((store) => store.variant);

function MyApp({ Component, pageProps }: AppProps) {
  const [repo, setRepo] = React.useState<RepoPayload | undefined>();

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.github.com/repos/jeanverster/chakra-ui-steps"
      );
      const json = await res.json();
      setRepo(json);
    }
    fetchData();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Provider>
        <SideNav repo={repo} />
        <Container
          maxW="container.lg"
          className="wrapper"
          sx={{
            display: { sm: "flex", md: "grid" },
            flexDir: "column",
            gap: 4,
            padding: [0, 0, 4],
            mx: "auto",
            minWidth: 0,
          }}
        >
          <MobileNav repo={repo} />

          <Component {...pageProps} />
        </Container>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
