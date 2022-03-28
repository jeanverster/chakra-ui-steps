import { useColorModeValue } from "@chakra-ui/color-mode";
import { RadioProps, useRadio } from "@chakra-ui/radio";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

type RadioCardProps = RadioProps & {
  icon?: IconType;
};

export const RadioCard = ({
  icon: Icon,
  children,
  ...rest
}: RadioCardProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(rest);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  const checkboxRef = React.useRef<any>(null);

  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      {...checkbox}
      cursor="pointer"
      ref={checkboxRef}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      // @ts-ignore
      onChange={(val) => console.log("val", val)}
      textTransform="capitalize"
      _checked={{
        bg: "blue.500",
        color: "white",
        borderColor: "teal.600",
      }}
      as="label"
      _focus={{
        boxShadow: "outline",
      }}
      _hover={{
        cursor: "pointer",
      }}
      px={8}
      py={4}
    >
      <input {...input} />
      <Flex
        sx={{
          flexDir: "column",
          alignItems: "center",
        }}
      >
        {Icon && (
          <Box sx={{ p: 4 }}>
            <Icon size="48px" />
          </Box>
        )}
        {children}
      </Flex>
    </Box>
  );
};
