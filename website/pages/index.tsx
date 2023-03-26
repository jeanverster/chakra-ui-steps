import { Basic } from "@/code-samples/examples";
import CopyButton from "@/components/CopyButton/CopyButton";
import LazyRender from "@/components/LazyRender/LazyRender";
import { Page } from "@/layouts";
import { CodeExample, getCodeExample } from "@/mdx/server";
import { FrontMatter } from "@/types";
import { replaceExtension } from "@/utils/replaceExtension";
import {
  Box,
  Code,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/layout";
import {
  Button,
  Divider,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useClipboard,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { default as NextLink } from "next/link";
import { CgCheckO } from "react-icons/cg";
import { FiCopy } from "react-icons/fi";
import Balancer from "react-wrap-balancer";
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
  snippet: CodeExample | undefined;
  customStyleSnippet: CodeExample | undefined;
  upgradeGuide: string | null;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const snippet = getCodeExample(
    "code-samples/snippets/ExtendThemeSnippet.tsx"
  );
  const customStyleSnippet = getCodeExample(
    "code-samples/snippets/CustomStylesSnippet.tsx"
  );
  const basicExample = getCodeExample("code-samples/examples/Basic.tsx");

  const upgradeGuideMarkdown = getCodeExample("md/upgrade-guide.mdx");

  return {
    props: {
      basicExample,
      snippet,
      customStyleSnippet,
      upgradeGuide: upgradeGuideMarkdown?.code || null,
    },
  };
};

const features = [
  "Horizontal and vertical layouts",
  "Extensible styling",
  "Right to left support",
  "Custom icons",
  "Multiple variants",
  "Easily render step content",
];

const Description = () => {
  return (
    <>
      <Text fontSize="lg">
        <Balancer>
          <Code>chakra-ui-steps</Code> makes it super easy to create multi-step
          interfaces in apps where you are already using{" "}
          <Link color="teal.400" href="https://chakra-ui.com">
            chakra-ui
          </Link>
          . Use it in forms, onboarding, or anywhere you want to lead the user
          through some logical steps.
        </Balancer>
      </Text>
    </>
  );
};

const CLASSES = [
  {
    className: "cui-steps",
    description: "Root element",
  },
  {
    className: "cui-steps__horizontal-step",
    description: "Outer wrapper for each step in horizontal layout",
  },
  {
    className: "cui-steps--horizontal-step-container",
    description: "Inner wrapper for each step in horizontal layout",
  },
  {
    className: "cui-steps__step-icon-container",
    description: "Wrapper for the step icon",
  },
  {
    className: "cui-steps__vertical-step",
    description: "Outer wrapper for each step in vertical layout",
  },
  {
    className: "cui-steps__vertical-step-container",
    description: "Inner wrapper for each step in vertical layout",
  },
  {
    className: "cui-steps__vertical-step-content",
    description: "Wrapper for the step content",
  },
];

const DATA_ATTRIBUTES = [
  {
    dataAttribute: "_active",
    description: "Select step which is currently active",
  },
  {
    dataAttribute: "_invalid",
    description: "Select steps that are invalid",
  },
  {
    dataAttribute: "_loading",
    description: "Select steps that are loading",
  },
  {
    dataAttribute: "_clickable",
    description: "Select steps that are clickable",
  },
  {
    dataAttribute: "_completed",
    description: "Select steps that are completed",
  },
];

const CopyCell = ({ text }: { text: string }) => {
  const { hasCopied, onCopy } = useClipboard(text);

  return (
    <Td>
      <Code>{text}</Code>
      <Button
        size="xs"
        ml={3}
        sx={{
          display: ["none", "none", "inline-block"],
        }}
      >
        {hasCopied ? (
          <Text>Copied</Text>
        ) : (
          <FiCopy
            onClick={() => onCopy()}
            color={hasCopied ? "green.500" : "gray.500"}
          />
        )}
      </Button>
    </Td>
  );
};

const Home: NextPage<HomeProps> = ({
  basicExample,
  snippet,
  customStyleSnippet,
}) => {
  const [variant] = useVariantContext();
  return (
    <Page
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description={<Description />}
    >
      <SimpleGrid columns={[1, 1, 2]} spacing={8} sx={{ mb: 10 }}>
        <Flex sx={{ py: 4, gap: 4, flexDir: "column" }}>
          <Heading fontSize="2xl">Installation</Heading>
          <Box>
            <Text fontWeight={"bold"}>npm</Text>
            <Code mt={3} py={2} px={3} rounded="md" whiteSpace={"pre"}>
              npm install chakra-ui-steps
              <CopyButton ml={3} size="sm" code="npm install chakra-ui-steps" />
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
            In order to get started, you will need to extend your theme with the
            steps component&apos;s styles. This can be done by importing{" "}
            <Code>StepsTheme</Code> from chakra-ui-steps and passing it to the{" "}
            <Code>extendTheme</Code> function from Chakra UI.
          </Balancer>
        </Text>
        <Box sx={{ my: 3 }}>
          <DynamicCodeHighlight
            prismProps={{
              code: snippet?.code || "",
            }}
          />
        </Box>

        <Text fontSize="lg">
          <Balancer>
            Once you have extended the theme, you can use the Steps component
            anywhere in your app. Below is a basic example of how you might use
            the Steps component.
          </Balancer>
        </Text>
      </Flex>
      {basicExample && (
        <LazyRender rootMargin="100px">
          <DynamicCodePreview
            title={replaceExtension(".tsx", basicExample.filename)}
            preview={<Basic variant={variant} />}
            description={
              <Text fontSize="lg">
                A basic example of how to use the Steps component.
              </Text>
            }
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
      <Divider my={8} />
      <Heading id="usage" fontSize="2xl" mb={4}>
        Custom Styles
      </Heading>
      <Text fontSize="lg">
        <Balancer>
          To customize the styles of the Steps component,{" "}
          <Code>chakra-ui-steps</Code> provides a list of css classes for each
          part of the component. You can use these classes to override the
          default styles. Below is a list of the classes that are available.
        </Balancer>
      </Text>
      <LazyRender rootMargin="100px">
        <Table my={10}>
          <Thead>
            <Tr>
              <Th>Class</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {CLASSES.map(({ className, description }) => (
              <Tr key={className}>
                <CopyCell text={className} />
                <Td>
                  <Text>
                    <Balancer>{description}</Balancer>
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </LazyRender>
      <Text fontSize="lg">
        <Balancer>
          In some cases you may want to customize the styles of a step based on
          its state. For example, you may want to change the color of a step
          when it is active. To do this, you can use the data attributes defined
          below.
        </Balancer>
      </Text>
      <LazyRender rootMargin="100px">
        <Table my={10}>
          <Thead>
            <Tr>
              <Th>Attribute</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {DATA_ATTRIBUTES.map(({ dataAttribute, description }) => (
              <Tr key={dataAttribute}>
                <CopyCell text={dataAttribute} />
                <Td>
                  <Text>
                    <Balancer>{description}</Balancer>
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </LazyRender>
      <Text fontSize="lg">
        Here is an example of how you might create some custom styles using a
        combination of the classes and data attributes.
      </Text>
      <LazyRender rootMargin="100px">
        <Box sx={{ my: 10 }}>
          <DynamicCodeHighlight
            prismProps={{
              code: customStyleSnippet?.code || "",
              language: "tsx",
            }}
          />
        </Box>
      </LazyRender>
      <Text sx={{ mb: 8, mt: 10 }} fontSize="lg">
        To get up and running and have a look at some code, check out the{" "}
        <NextLink passHref href="/examples">
          <Link color="teal.400">examples </Link>
        </NextLink>
        page.
      </Text>
    </Page>
  );
};

export default Home;
