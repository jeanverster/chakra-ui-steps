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
  const { back } = useRouter();
  return (
    <Box
      as="main"
      px={{ base: 8, md: 2 }}
      pt={["96px", "12vmax", "12vmin"]}
      pb="128px"
      sx={{
        display: ["inherit", "inherit", "block"],
        flexDir: "column",
        minW: 0,
      }}
      {...rest}
    >
      <Head>
        <title>{title}</title>
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
        <>
          <Heading color="blue.500" fontSize={["2xl", "4xl"]} sx={{ mb: 6 }}>
            {title}
          </Heading>
          <Text fontSize="lg">{description}</Text>
          <Box mt={8} mb={10} />
        </>
      )}
      {children}
    </Box>
  );
};

Page.defaultProps = {
  title: "Title",
  description: "Description",
};
