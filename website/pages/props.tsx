import { Page } from "@/layouts";
import { Box, Code, Flex, Heading, Text } from "@chakra-ui/react";
import { InferGetStaticPropsType } from "next";
import Balancer from "react-wrap-balancer";
import PropsTable from "../code-samples/props";
import CodeHighlight from "../containers/CodeHighlight/CodeHighlight";
import { CodeExample, getFileString } from "../mdx/server";

export const getStaticProps = async () => {
  const useStepsSnippet = getFileString(
    "code-samples/snippets/UseStepsSnippet.tsx"
  );

  return {
    props: {
      useStepsSnippet: JSON.parse(
        JSON.stringify(useStepsSnippet)
      ) as CodeExample,
    },
  };
};

const Props = ({
  useStepsSnippet,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Page
      title="Props"
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Props table for all components provided by chakra-ui-steps."
    >
      <PropsTable />
      <Flex sx={{ mt: 12, gap: 4, flexDir: "column" }}>
        <Heading>Hooks</Heading>
        <Text>
          <Balancer>
            Along with the components, chakra-ui-steps provides a{" "}
            <Code>useSteps</Code> hook that can be used to control the state of
            the steps.
          </Balancer>
        </Text>
        <Box sx={{ mt: 3, mb: 12 }}>
          <CodeHighlight code={useStepsSnippet} />
        </Box>
      </Flex>
    </Page>
  );
};

export default Props;
