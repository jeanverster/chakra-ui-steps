import { Page } from "@/layouts";
import { Button, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <Page title="Oops!" description="This page does not exist.">
      <VStack spacing="4" as="section" textAlign="left" justify="flex-start">
        <span style={{ fontSize: "8rem" }} role="img" aria-label="smile">
          😢
        </span>
        <NextLink href="/" passHref>
          <Button
            as="a"
            aria-label="Back to Home"
            leftIcon={<FaHome />}
            colorScheme="teal"
          >
            Back to Home
          </Button>
        </NextLink>
      </VStack>
    </Page>
  );
};

export default NotFoundPage;
