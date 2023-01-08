import { FlexProps } from "@chakra-ui/layout";
import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export const Logo = (props: FlexProps): JSX.Element => {
  return (
    <Flex {...props}>
      <Link href="/" passHref>
        <Heading size="xl" fontWeight="extrabold">
          chakra-ui-steps
        </Heading>
      </Link>
    </Flex>
  );
};
