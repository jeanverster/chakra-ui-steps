import { Box } from "@chakra-ui/layout";

export const BlockQuote: React.FC<any> = (props) => {
  return (
    <Box
      {...props}
      padding="5"
      borderRadius="md"
      backgroundColor="gray.700"
      mt={4}
      mb={8}
      borderColor="blue.500"
      borderLeftWidth={4}
    />
  );
};
