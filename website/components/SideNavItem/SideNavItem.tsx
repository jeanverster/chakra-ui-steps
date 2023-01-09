import { useColorModeValue } from "@chakra-ui/color-mode";
import { Text } from "@chakra-ui/layout";
import { Flex, FlexProps } from "@chakra-ui/react";
import Link from "next/link";

type SideNavItemProps = FlexProps & {
  active?: boolean;
  title: string;
  href: string;
};

export const SideNavItem = ({
  href,
  as,
  active,
  title,
  ...rest
}: SideNavItemProps): JSX.Element => {
  const color = useColorModeValue("gray.700", "gray.200");

  return (
    <Link passHref href={href}>
      <Flex
        as="a"
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
