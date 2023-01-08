import { Flex } from "@chakra-ui/layout";
import * as React from "react";
import { ColorModeSwitcher } from "..";
import { Logo } from "../Logo";

export const Header = (): JSX.Element => {
  // const bg = useColorModeValue("blackAl", "gray.800");

  return (
    <Flex
      px={4}
      top={0}
      bg="blackAlpha.200"
      as="nav"
      left={0}
      right={0}
      height={16}
      align="center"
      backdropFilter="blur(2px)"
      zIndex="sticky"
      position="fixed"
      borderBottomWidth={1}
      justify="space-between"
      alignItems="center"
    >
      <Logo />
      <ColorModeSwitcher />
    </Flex>
  );
};
