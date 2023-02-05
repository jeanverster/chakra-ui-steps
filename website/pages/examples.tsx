import { Page } from "@/layouts";
import { Code, Divider, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import Balancer from "react-wrap-balancer";
import * as ExampleComponents from "../code-samples/examples";
import LazyRender from "../components/LazyRender/LazyRender";
import { CodeExample, getFileStrings } from "../mdx/server";
import { replaceExtension } from "../utils/replaceExtension";
import { useVariantContext } from "./_app";

interface ExamplesProps {
  examples: CodeExample[];
  snippets: CodeExample[];
}

const DynamicCodePreview = dynamic(
  () => import("../containers/CodePreview/CodePreview"),
  {
    ssr: false,
  }
);

export const getStaticProps: GetStaticProps<ExamplesProps> = async () => {
  const examples = getFileStrings("code-samples/examples");
  const snippets = getFileStrings("code-samples/snippets");

  return {
    props: {
      examples: JSON.parse(JSON.stringify(examples)),
      snippets: JSON.parse(JSON.stringify(snippets)),
    },
  };
};

// TODO: fix this
const getJSXDescription = (
  filename: string,
  snippets?: CodeExample[]
): JSX.Element => {
  switch (filename) {
    case "Basic.tsx":
      return (
        <Text>
          <Balancer>
            This is the simplest example of how to use the <Code>Steps</Code>{" "}
            component.
          </Balancer>
        </Text>
      );
    case "Clickable.tsx":
      return (
        <Text>
          <Balancer>
            If <Code>onClickStep</Code> is defined, the steps will become
            clickable. Remember to pass the <Code>activeStep</Code> prop to the{" "}
            <Code>Steps</Code> component and update it.
          </Balancer>
        </Text>
      );
    case "Descriptions.tsx":
      return (
        <Text textAlign="left">
          <Balancer>
            The <Code>Step</Code> component also accepts a{" "}
            <Code>description</Code> prop which can be used to provide some
            extra information about the step.
          </Balancer>
        </Text>
      );
    case "Sizes.tsx":
      return (
        <Text textAlign="left">
          By using the <Code>size</Code> prop you are able to quickly and easily
          adjust the general sizing of the component.
        </Text>
      );
    case "CustomIcons.tsx":
      return (
        <Text>
          <Balancer>
            You can use any icon library you want. In this example we are using{" "}
            <Code>react-icons</Code> but you can use any other library you want.
            Note: icons are only visible when using the <Code>circles</Code> or{" "}
            <Code>circles-alt</Code> variants.
          </Balancer>
        </Text>
      );
    case "Vertical.tsx":
      return (
        <Text>
          <Balancer>
            By using the <Code>orientation</Code> prop you are able to switch
            between <Code>horizontal</Code> (default) and <Code>vertical</Code>{" "}
            orientations. By default, when in mobile view the <Code>Steps</Code>{" "}
            component will switch to <Code>vertical</Code> orientation. You are
            also able to customize the breakpoint at which the component
            switches to <Code>vertical</Code> orientation by using the{" "}
            <Code>responsiveBreakpoint</Code> prop.
          </Balancer>
        </Text>
      );
    default:
      return <></>;
  }
};

const Examples = ({ examples, snippets }: ExamplesProps): JSX.Element => {
  const [variant] = useVariantContext();

  const renderExamples = React.useMemo(() => {
    return examples.map((example, index) => {
      const key = example.filename.replace(
        ".tsx",
        ""
      ) as keyof typeof ExampleComponents;
      const Component = ExampleComponents[key];
      const description = getJSXDescription(example.filename, snippets);
      return (
        <div key={`${key}-${index}`}>
          <LazyRender key={`${example.filename}-${index}`} rootMargin="100px">
            <DynamicCodePreview
              title={replaceExtension(".tsx", example.filename)}
              preview={<Component variant={variant} />}
              description={description}
              code={[
                {
                  language: "tsx",
                  filename: example?.filename,
                  code: example?.code,
                },
              ]}
            />
          </LazyRender>
          {index !== examples.length - 1 && <Divider sx={{ my: 10 }} />}
        </div>
      );
    });
  }, [examples, variant, snippets]);

  return (
    <Page
      title="Examples"
      metaDescription="Examples of how to use chakra-ui-steps in your app."
      description="See below a list of examples of how to use chakra-ui-steps in your app."
    >
      {renderExamples}
    </Page>
  );
};

export default Examples;
