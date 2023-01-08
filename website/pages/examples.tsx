import { Page } from "@/layouts";
import { Divider } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import * as ExampleComponents from "../code-samples/examples";
import LazyRender from "../components/LazyRender/LazyRender";
import { CodeExample, getFileStrings } from "../mdx/server";
import { replaceExtension } from "../utils/replaceExtension";
import { useVariantContext } from "./_app";

interface ExamplesProps {
  examples: CodeExample[];
}

const DynamicSectionWrap = dynamic(
  () => import("../containers/SectionWrap/SectionWrap"),
  {
    ssr: false,
  }
);

export const getStaticProps: GetStaticProps<ExamplesProps> = async () => {
  const examples = getFileStrings("code-samples/examples");

  return {
    props: {
      examples: JSON.parse(JSON.stringify(examples)),
    },
  };
};

const Examples = ({ examples }: ExamplesProps): JSX.Element => {
  const [variant] = useVariantContext();

  const renderExamples = () => {
    return examples.map((example, index) => {
      const Component =
        ExampleComponents[
          example.fileName.replace(".tsx", "") as keyof typeof ExampleComponents
        ];
      return (
        <>
          <LazyRender key={`${example.fileName}-${index}`} rootMargin="100px">
            <DynamicSectionWrap
              title={replaceExtension(".tsx", example.fileName)}
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
      title="Examples"
      metaDescription="Examples of how to use chakra-ui-steps in your app."
      description="See below a list of examples of how to use chakra-ui-steps in your app."
    >
      {renderExamples()}
    </Page>
  );
};

export default Examples;
