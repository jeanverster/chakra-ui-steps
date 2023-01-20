import { Box, Text } from "@chakra-ui/react";
import { useCardBg } from "../../hooks/useCardBg";

type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => {
  return (
    <Box
      sx={{
        p: 2,
        bg: useCardBg(),
        rounded: "md",
        boxShadow: "sm",
      }}
    >
      <Text fontSize="md" color="red.400" fontWeight={"bold"}>
        {message}
      </Text>
    </Box>
  );
};
