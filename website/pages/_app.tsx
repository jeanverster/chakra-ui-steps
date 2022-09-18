import { SideNav } from "@/components";
import { ChakraProvider, Container } from "@chakra-ui/react";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/700.css";
import type { AppProps } from "next/app";
import MobileNav from "../components/MobileNav/MobileNav";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Container
        maxW="container.xl"
        className="wrapper"
        sx={{
          display: { sm: "flex", md: "grid" },
          flexDir: "column",
          gap: 4,
          padding: [0, 0, 4],
          mx: "auto",
          gridTemplateColumns: `300px minmax(0, 1fr)`,
          minWidth: 0,
        }}
      >
        <MobileNav />
        <SideNav />
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
