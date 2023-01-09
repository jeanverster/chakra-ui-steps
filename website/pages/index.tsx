import { useCardBg } from "@/hooks/useCardBg";
import { Page } from "@/layouts";
import { FrontMatter } from "@/types";
import {
  Box,
  Code,
  Divider,
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
import { BasicExample } from "../code-samples/examples";
import Props from "../code-samples/props";
import CopyButton from "../components/CopyButton/CopyButton";
import LazyRender from "../components/LazyRender/LazyRender";
import { CodeExample, getFileString, getFileStrings } from "../mdx/server";
import { replaceExtension } from "../utils/replaceExtension";
import { useVariantContext } from "./_app";

const DynamicSectionWrap = dynamic(
  () => import("../containers/SectionWrap/SectionWrap"),
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

  const basicExample = getFileString("code-samples/examples/BasicExample.tsx");

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
  // console.log("snippets", snippets);
  const [variant] = useVariantContext();
  const bg = useCardBg();

  const extendThemeSnippet = snippets.find(
    (snippet) => snippet.fileName === "ExtendThemeSnippet.tsx"
  );
  // const basicExample = examples.find(
  //   (example) => example.fileName === "BasicExample.tsx"
  // );

  return (
    <Page
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Chakra UI Steps makes it super easy to create multi-step interfaces in apps where you are already using Chakra UI. Use it in forms, onboarding, or anywhere you want to lead the user through some logical steps. Below is an example of how you might use it in a form."
    >
      <Suspense fallback={"Loading..."}>
        {/* <ReactHookFormExample /> */}
        <Divider my={12} />
        <Box sx={{ mb: 6 }}>
          <Heading as="h2" size="xl" mb={6}>
            Getting Started
          </Heading>
        </Box>
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
          <Flex sx={{ py: 4, gap: 4, flexDir: "column" }}>
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
        <Flex sx={{ mb: 10, flexDir: "column", gap: 4 }}>
          <Heading id="usage" fontSize="2xl">
            Usage
          </Heading>
          <Text fontSize="lg">
            In order to get started you will need to extend the default Chakra
            theme with the provided StepsStyleConfig object, like so:
          </Text>
          <LazyRender>
            <DynamicCodeHighlight code={extendThemeSnippet} />
          </LazyRender>
          <Text fontSize="lg">
            Once that&apos;s done you should be able to use the Steps component
            in your app!
          </Text>
        </Flex>
        <Divider sx={{ mb: 10 }} />
        {basicExample && (
          <LazyRender rootMargin="100px">
            <DynamicSectionWrap
              title={replaceExtension(".tsx", basicExample.fileName)}
              description="A basic example of how to use the Steps component."
              preview={<BasicExample variant={variant} />}
              code={[
                {
                  language: "tsx",
                  filename: basicExample?.fileName,
                  code: basicExample?.code,
                },
              ]}
            />
          </LazyRender>
        )}

        <Props />
      </Suspense>
    </Page>
  );
};

export default Home;
