import { useColorModeValue } from "@chakra-ui/color-mode";
import { Text } from "@chakra-ui/layout";
import { Flex, FlexProps } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import React from "react";

type SideNavItemProps = LinkProps &
  FlexProps & {
    active?: boolean;
    title: string;
  };

export const SideNavItem = ({
  href,
  as,
  replace,
  scroll,
  passHref,
  prefetch,
  shallow,
  active,
  title,
  ...rest
}: SideNavItemProps): JSX.Element => {
  const color = useColorModeValue("gray.700", "gray.200");
  return (
    <Link {...{ href, as, replace, scroll, passHref, prefetch, shallow }}>
      <Flex
        height="100%"
        fontSize="sm"
        pos="relative"
        align="center"
        transition="all 0.2s ease"
        opacity={active ? 1 : 0.9}
        color={active ? "blue.500" : color}
        _hover={{
          cursor: "pointer",
          opacity: 1,
          transition: "all 0.2s ease",
        }}
        {...rest}
      >
        <Text fontSize="sm" fontWeight={600}>
          {title}
        </Text>
      </Flex>
    </Link>
  );
};
