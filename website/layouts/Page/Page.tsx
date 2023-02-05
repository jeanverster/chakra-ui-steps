import { Box, FlexProps, Heading } from "@chakra-ui/layout";
import { IconButton, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { Suspense } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import Balancer from "react-wrap-balancer";

type PageProps = FlexProps & {
  title?: string;
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
  const { back } = useRouter();
  const metaTitle = title ? `${title} - Chakra UI Steps` : "Chakra UI Steps";
  return (
    <Box
      as="main"
      px={{ base: 8, md: 2 }}
      pt="128px"
      sx={{
        display: ["inherit", "inherit", "block"],
        flexDir: "column",
        minW: 0,
      }}
      {...rest}
    >
      <Head key="page">
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription || description} />
      </Head>

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
        <Box my={8} display="flex" flexDir={"column"} gap={3}>
          <Heading fontSize={["3xl", "4xl"]} sx={{ mb: 6 }}>
            {title || "Chakra UI Steps"}
          </Heading>
          {description && (
            <Text fontSize="lg">
              <Balancer>{description}</Balancer>
            </Text>
          )}
        </Box>
      )}
      <Suspense>{children}</Suspense>
    </Box>
  );
};

Page.defaultProps = {
  description: "Description",
};
