import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import "@fontsource/manrope/400.css";
// import "@fontsource/manrope/700.css";
// import "@fontsource/sora/400.css";
// import "@fontsource/sora/700.css";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const theme = extendTheme({
  components: {
    Steps,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
