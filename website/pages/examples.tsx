import { Page } from "@/layouts";
import { Code, Divider, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import * as React from "react";
import * as ExampleComponents from "../code-samples/examples";
import CodePreview from "../containers/CodePreview/CodePreview";
import { CodeExample, getCodeExamples } from "../mdx/server";
import { replaceExtension } from "../utils/replaceExtension";
import { useVariantContext } from "./_app";

interface ExamplesProps {
  examples: CodeExample[];
  snippets: CodeExample[];
}

export const getStaticProps: GetStaticProps<ExamplesProps> = async () => {
  const examples = getCodeExamples("code-samples/examples");
  const snippets = getCodeExamples("code-samples/snippets");

  return {
    props: {
      examples: JSON.parse(JSON.stringify(examples)),
      snippets: JSON.parse(JSON.stringify(snippets)),
    },
  };
};

// TODO: fix this
const getJSXDescription = (filename: string): JSX.Element => {
  switch (filename) {
    case "Basic.tsx":
      return (
        <Text>
          <>
            This is the simplest example of how to use the <Code>Steps</Code>{" "}
            component.
          </>
        </Text>
      );
    case "Clickable.tsx":
      return (
        <Text>
          <>
            If <Code>onClickStep</Code> is defined, the steps will become
            clickable.
          </>
        </Text>
      );
    case "Descriptions.tsx":
      return (
        <Text textAlign="left">
          <>
            The <Code>Step</Code> component also accepts a{" "}
            <Code>description</Code> prop which can be used to provide some
            extra information about the step.
          </>
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
          <>
            Note: icons are only visible when using the <Code>circles</Code> or{" "}
            <Code>circles-alt</Code> variants.
          </>
        </Text>
      );
    case "Vertical.tsx":
      return (
        <Text>
          <>
            By using the <Code>orientation</Code> prop you are able to switch
            between <Code>horizontal</Code> (default) and <Code>vertical</Code>{" "}
            orientations. By default, when in mobile view the <Code>Steps</Code>{" "}
            component will switch to <Code>vertical</Code> orientation. You are
            also able to customize the breakpoint at which the component
            switches to <Code>vertical</Code> orientation by using the{" "}
            <Code>responsiveBreakpoint</Code> prop.
          </>
        </Text>
      );
    case "CustomCheckIcon.tsx":
      return (
        <Text>
          <>
            You are also able to customise the check icon by using the{" "}
            <Code>checkIcon</Code> prop.
            <br />
            <br />
            The <Code>checkIcon</Code> prop can also be used on the individual{" "}
            <Code>Step</Code> components. This will override the global{" "}
            <Code>checkIcon</Code> prop.
            <br />
            <br />
            Note: icons are only visible when using the <Code>
              circles
            </Code> or <Code>circles-alt</Code> variants.
          </>
        </Text>
      );
    case "DynamicSteps.tsx":
      return (
        <Text>
          <>
            The <Code>Steps</Code> component also supports dynamic steps. This
            means that you can add and remove steps from the component at any
            time.
          </>
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
      const description = getJSXDescription(example.filename);
      return (
        <div key={`${key}-${index}`}>
          <CodePreview
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

          {index !== examples.length - 1 && <Divider sx={{ my: 10 }} />}
        </div>
      );
    });
  }, [examples, variant]);

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
