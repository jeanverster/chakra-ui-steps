import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, FlexProps, Heading } from "@chakra-ui/layout";
import { Container, IconButton, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

type PageProps = FlexProps & {
  title: string;
  children: React.ReactNode;
  description: string;
  metaDescription?: string;
  hideTopTitle?: boolean;
  showBackButton?: boolean;
};

export const Page = ({
  children,
  title,
  description,
  hideTopTitle = false,
  showBackButton = false,
  metaDescription,
  ...rest
}: PageProps): JSX.Element => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const { back } = useRouter();
  return (
    <Flex bg={bg} {...rest}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription || description} />
      </Head>
      <Container
        px={{ base: 8, md: 2 }}
        pt={["96px", "12vmax", "12vmin"]}
        pb="128px"
        maxW="container.md"
        as="main"
      >
        {showBackButton && (
          <IconButton
            size="sm"
            mb={4}
            onClick={() => back()}
            aria-label="Back to writing page"
            icon={<RiArrowGoBackFill />}
          />
        )}
        {!hideTopTitle && (
          <>
            <Heading color="brand.500" fontSize={["2xl", "4xl"]} sx={{ mb: 6 }}>
              {title}
            </Heading>
            <Text fontSize="lg">{description}</Text>
            <Box my={8} />
          </>
        )}
        {children}
      </Container>
    </Flex>
  );
};

Page.defaultProps = {
  minH: "100vh",
  title: "Title",
  description: "Description",
};
