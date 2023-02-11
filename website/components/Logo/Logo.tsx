import { FlexProps } from "@chakra-ui/layout";
import { Image, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export const Logo = (props: FlexProps): JSX.Element => {
  return (
    <>
      <Image
        alt="Chakra UI Logo"
        width="24px"
        height="24px"
        rounded="full"
        src={"/54212428.png"}
      />

      <Link passHref href="/">
        <ChakraLink
          ml={2}
          textAlign="left"
          fontSize="xl"
          fontWeight={"bold"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
          _hover={{
            cursor: "pointer",
            color: "teal.500",
            transition: "all 0.2s ease",
          }}
        >
          chakra-ui-steps
        </ChakraLink>
      </Link>
    </>
  );
};
