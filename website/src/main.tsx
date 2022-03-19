import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import "@fontsource/manrope/400.css";
// import "@fontsource/manrope/700.css";
// import "@fontsource/sora/400.css";
// import "@fontsource/sora/700.css";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const theme = extendTheme({
  components: {
    Steps,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
