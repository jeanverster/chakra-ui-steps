import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, FlexProps, Heading } from "@chakra-ui/layout";
import { IconButton, Text } from "@chakra-ui/react";
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
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription || description} />
      </Head>
      <Box
        className="main-container"
        px={{ base: 8, md: 2 }}
        pt={["96px", "12vmax", "12vmin"]}
        pb="128px"
        sx={{ display: "inherit", minHeight: "100vh" }}
        {...rest}
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
            <Heading color="blue.200" fontSize={["2xl", "4xl"]} sx={{ mb: 6 }}>
              {title}
            </Heading>
            <Text sx={{ mb: 4 }} fontSize="lg">
              {description}
            </Text>
            <Box mt={8} mb={10} />
          </>
        )}
        {children}
      </Box>
    </>
  );
};

Page.defaultProps = {
  minH: "100vh",
  title: "Title",
  description: "Description",
};
