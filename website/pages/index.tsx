import { Page } from "@/layouts";
import { FrontMatter } from "@/types";
import {
  Box,
  Code,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CgCheckO } from "react-icons/cg";
import Balancer from "react-wrap-balancer";
import { Basic } from "../code-samples/examples";
import CopyButton from "../components/CopyButton/CopyButton";
import LazyRender from "../components/LazyRender/LazyRender";
import { CodeExample, getFileString, getFileStrings } from "../mdx/server";
import { replaceExtension } from "../utils/replaceExtension";
import { useVariantContext } from "./_app";

const DynamicCodePreview = dynamic(
  () => import("../containers/CodePreview/CodePreview"),
  {
    ssr: false,
  }
);

const DynamicCodeHighlight = dynamic(
  () => import("../containers/CodeHighlight/CodeHighlight"),
  {
    ssr: false,
  }
);

export type Section = {
  frontmatter: FrontMatter;
  code: string;
};

type HomeProps = {
  basicExample: CodeExample | undefined;
  snippets: CodeExample[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const snippets = getFileStrings("code-samples/snippets");

  const basicExample = getFileString("code-samples/examples/Basic.tsx");

  return {
    props: {
      basicExample,
      snippets: JSON.parse(JSON.stringify(snippets)),
    },
  };
};

const features = [
  "Horizontal and vertical layouts",
  "Extensible styling",
  "Right to left support",
  "Custom icons",
  "Multiple variants",
];

const Home: NextPage<HomeProps> = ({ basicExample, snippets }) => {
  const [variant] = useVariantContext();

  const extendThemeSnippet = snippets.find(
    (snippet) => snippet.filename === "ExtendThemeSnippet.tsx"
  );

  return (
    <Page
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Chakra UI Steps makes it super easy to create multi-step interfaces in apps where you are already using Chakra UI. Use it in forms, onboarding, or anywhere you want to lead the user through some logical steps."
    >
      <Suspense fallback={"Loading..."}>
        <SimpleGrid columns={[1, 1, 2]} spacing={8} sx={{ mb: 10 }}>
          <Flex sx={{ py: 4, gap: 4, flexDir: "column" }}>
            <Heading fontSize="2xl">Installation</Heading>
            <Box>
              <Text fontWeight={"bold"}>npm</Text>
              <Code mt={3} py={2} px={3} rounded="md" whiteSpace={"pre"}>
                npm install chakra-ui-steps
                <CopyButton
                  ml={3}
                  size="sm"
                  code="npm install chakra-ui-steps"
                />
              </Code>
            </Box>
            <Box>
              <Text fontWeight={"bold"}>yarn</Text>
              <Code mt={3} py={2} px={3} rounded="md" whiteSpace={"pre"}>
                yarn add chakra-ui-steps
                <CopyButton ml={3} size="sm" code="yarn add chakra-ui-steps" />
              </Code>
            </Box>
          </Flex>
          <Flex
            sx={{
              py: 4,
              gap: 4,
              flexDir: "column",
            }}
          >
            <Heading fontSize="2xl">Features</Heading>

            <List spacing={3}>
              {features.map((feature, index) => (
                <ListItem
                  key={feature}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    fontWeight: "bold",
                  }}
                >
                  <ListIcon as={CgCheckO} color="green.500" />
                  {feature}
                </ListItem>
              ))}
            </List>
          </Flex>
        </SimpleGrid>
        <Flex
          sx={{
            mb: 10,
            flexDir: "column",
            gap: 4,
          }}
        >
          <Heading id="usage" fontSize="2xl">
            Usage
          </Heading>
          <Text fontSize="lg">
            <Balancer>
              In order to get started, you will need to extend your theme with
              the steps component&apos;s styles. This can be done by importing{" "}
              <Code>StepsTheme</Code> from chakra-ui-steps and passing it to the{" "}
              <Code>extendTheme</Code> function from Chakra UI.
            </Balancer>
          </Text>
          <Box sx={{ my: 3 }}>
            <DynamicCodeHighlight code={extendThemeSnippet} />
          </Box>

          <Text fontSize="lg">
            <Balancer>
              Once you have extended the theme, you can use the Steps component
              anywhere in your app. Below is a basic example of how you might
              use the Steps component.
            </Balancer>
          </Text>
        </Flex>
        {/* <Divider sx={{ mb: 10 }} /> */}
        {basicExample && (
          <LazyRender rootMargin="100px">
            <DynamicCodePreview
              title={replaceExtension(".tsx", basicExample.filename)}
              preview={<Basic variant={variant} />}
              code={[
                {
                  language: "tsx",
                  filename: basicExample?.filename,
                  code: basicExample?.code,
                },
              ]}
            />
          </LazyRender>
        )}
      </Suspense>
    </Page>
  );
};

export default Home;
