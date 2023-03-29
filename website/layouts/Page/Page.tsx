import { Box, FlexProps, Heading } from "@chakra-ui/layout";
import { IconButton, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import Balancer from "react-wrap-balancer";

type PageProps = FlexProps & {
  title?: string;
  children: React.ReactNode;
  description: React.ReactNode | string;
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
  metaDescription: metaDescriptionProp,
  ...rest
}: PageProps): JSX.Element => {
  const { back } = useRouter();
  const metaTitle = title ? `${title} - Chakra UI Steps` : "Chakra UI Steps";
  // if description is a string, use it as meta description
  const metaDescription =
    typeof description === "string" ? description : metaDescriptionProp || "";

  const renderDescription = () => {
    if (React.isValidElement(description)) {
      return description;
    } else if (typeof description === "string") {
      return (
        <Text fontSize="lg">
          <Balancer>{description}</Balancer>
        </Text>
      );
    }
    return null;
  };
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
        <meta name="description" content={metaDescription} />

        <title>Chakra UI Steps</title>

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://chakra-ui-steps.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Chakra UI Steps" />
        <meta
          property="og:description"
          content="Steps component designed to work seamlessly with Chakra UI"
        />
        <meta
          property="og:image"
          content="https://chakra-ui-steps.vercel.app/api/og"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="chakra-ui-steps.vercel.app" />
        <meta
          property="twitter:url"
          content="https://chakra-ui-steps.vercel.app/"
        />
        <meta name="twitter:title" content="Chakra UI Steps" />
        <meta
          name="twitter:description"
          content="Steps component designed to work seamlessly with Chakra UI"
        />
        <meta
          name="twitter:image"
          content="https://chakra-ui-steps.vercel.app/api/og"
        />
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
          {renderDescription()}
        </Box>
      )}
      {children}
    </Box>
  );
};

Page.defaultProps = {
  description: "Description",
};
