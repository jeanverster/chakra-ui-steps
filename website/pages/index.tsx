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
} from "@chakra-ui/layout";
import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { CgCheckO } from "react-icons/cg";
import * as CodeExamples from "../code-samples/examples";
import Props from "../code-samples/props";
import CopyButton from "../components/CopyButton/CopyButton";
import LazyRender from "../components/LazyRender/LazyRender";
import { CodeExample, getFileStrings } from "../mdx/server";
import { useVariantContext } from "./_app";

console.log("CodeExamples", CodeExamples);

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
  codeExamples: CodeExample[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const codeExamples = getFileStrings();

  return {
    props: { codeExamples: JSON.parse(JSON.stringify(codeExamples)) },
  };
};

const features = [
  "Horizontal and vertical layouts",
  "Extensible styling",
  "Right to left support",
  "Custom icons",
  "Multiple variants",
];

const Home: NextPage<HomeProps> = ({ codeExamples }) => {
  const [variant] = useVariantContext();

  const renderExamples = () => {
    return codeExamples.map((example, index) => {
      const Component =
        CodeExamples[
          example.fileName.replace(".tsx", "") as keyof typeof CodeExamples
        ];
      return (
        <>
          <LazyRender key={`${example.fileName}-${index}`} rootMargin="100px">
            <DynamicSectionWrap
              title={example.fileName
                .replace(".tsx", "")
                .replace(/([A-Z])/g, " $1")
                .trim()}
              description="A basic example of how to use the Steps component."
              preview={<Component variant={variant} />}
              code={[
                {
                  language: "tsx",
                  filename: example?.fileName,
                  code: example?.code,
                },
              ]}
            />
          </LazyRender>
          <Divider sx={{ my: 10 }} />
        </>
      );
    });
  };

  return (
    <Page
      title="Chakra UI Steps"
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Chakra UI Steps makes it super easy to create multi-step interfaces in apps where you are already using Chakra UI. Use it in forms, onboarding, or anywhere you want to lead the user through some logical steps."
    >
      <Suspense fallback={"Loading..."}>
        <Box sx={{ mb: 10 }}>
          <Heading fontSize="2xl">Features</Heading>
          <List spacing={3} sx={{ my: 4 }}>
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
        </Box>
        <Box sx={{ mb: 10 }}>
          <Heading id="installation" fontSize="2xl">
            Installation
          </Heading>
          <Box
            sx={{
              my: 4,
              gap: 4,
              display: "flex",
              flexDir: "column",
            }}
          >
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
          </Box>
        </Box>
        <Flex sx={{ mb: 10, flexDir: "column", gap: 4 }}>
          <Heading id="usage" fontSize="2xl">
            Usage
          </Heading>
          <Text fontSize="lg">
            In order to get started you will need to extend the default Chakra
            theme with the provided StepsStyleConfig object, like so:
          </Text>
          {/* <Box>
            <LazyRender>
              <DynamicCodeHighlight code={extendThemeExample} />
            </LazyRender>
          </Box> */}
          <Text fontSize="lg">
            Once that&apos;s done you should be able to use the Steps component
            in your app!
          </Text>
        </Flex>
        <Divider sx={{ mb: 10 }} />
        {renderExamples()}
        <Props />
      </Suspense>
    </Page>
  );
};

export default Home;
