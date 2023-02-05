import { Page } from "@/layouts";
import { Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { components } from "../mdx/components";
import { getChangelog } from "../mdx/server";

interface ChangelogProps {
  changelog: string;
}

export const getStaticProps: GetStaticProps<ChangelogProps> = async () => {
  const changelog = getChangelog();

  return {
    props: {
      changelog,
    },
  };
};

const Changelog = ({ changelog }: ChangelogProps): JSX.Element => {
  const renderChangelog = useMemo(() => {
    return (
      <Box
        sx={{
          h2: {
            fontSize: "xl",
            a: {
              fontSize: "3xl",
              color: "teal.400",
            },
          },
          mb: 12,
        }}
      >
        {/* 
        // @ts-ignore */}
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
          {changelog.toString()}
        </ReactMarkdown>
      </Box>
    );
  }, [changelog]);

  return (
    <Page
      title="Changelog"
      metaDescription="Changelog of how to use chakra-ui-steps in your app."
      description="Here you can see a list of all the changes that have been made to the library."
    >
      {renderChangelog}
    </Page>
  );
};

export default Changelog;
