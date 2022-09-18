import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  components: {
    Steps,
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
};

export default App;
