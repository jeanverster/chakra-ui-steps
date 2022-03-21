import { Box } from "@chakra-ui/layout";

export const BlockQuote: React.FC<any> = (props) => {
  return (
    <Box
      {...props}
      padding="5"
      borderRadius="md"
      backgroundColor="gray.800"
      borderLeft={`4px solid green`}
    />
  );
};
