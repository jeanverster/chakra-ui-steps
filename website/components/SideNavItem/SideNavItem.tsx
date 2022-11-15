import { useColorModeValue } from "@chakra-ui/color-mode";
import { Text } from "@chakra-ui/layout";
import { Flex, FlexProps } from "@chakra-ui/react";

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

  // add href to url and then scroll to that element
  const handleClick = () => {
    const url = new URL(window.location.href);
    url.hash = href;
    window.location.href = url.href;
    window.location.hash = href;
    window.scrollTo(0, 0);
  };

  return (
    <Flex
      height="100%"
      fontSize="sm"
      pos="relative"
      align="center"
      onClick={handleClick}
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
  );
};
