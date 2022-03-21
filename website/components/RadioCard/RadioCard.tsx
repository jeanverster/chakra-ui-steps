import { RadioProps, useRadio } from "@chakra-ui/radio";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export const RadioCard = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const checkboxRef = React.useRef<HTMLInputElement>(null);

  return (
    <Flex as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        ref={checkboxRef}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        onChange={(val) => console.log("val", val)}
        textTransform="capitalize"
        _checked={{
          bg: "brand.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        _hover={{
          cursor: "pointer",
        }}
        px={8}
        py={4}
      >
        {props.children}
      </Box>
    </Flex>
  );
};
