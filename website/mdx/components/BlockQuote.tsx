import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";

export const BlockQuote: React.FC<any> = (props) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <Box
      {...props}
      padding="5"
      borderRadius="md"
      backgroundColor={bg}
      mt={4}
      mb={8}
      borderColor="blue.500"
      borderLeftWidth={4}
    />
  );
};
