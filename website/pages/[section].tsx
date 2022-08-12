import { NavSection } from "@/components";
import { Page } from "@/layouts";
import { Flex } from "@chakra-ui/layout";
import { Button, Heading } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Section } from ".";
import { getSection, getSections } from "../mdx/server";
import { prettyPrintSlug } from "../utils/prettyPrintSlug";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const section = await getSection(params?.section as string);
    return {
      props: {
        section,
      },
    };
  } catch (error) {
    return {
      props: {
        section: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ section: string }> = () => {
  const paths = getSections().map(({ slug }) => ({
    params: { section: slug },
  }));
  return {
    paths,
    fallback: true,
  };
};

const Section: NextPage<{ section: Section }> = ({ section }) => {
  if (!section) {
    return <>Not found</>;
  }

  const { frontmatter, code } = section;
  console.log("~ frontmatter", frontmatter);

  return (
    <Page
      hideTopTitle
      title={frontmatter.title}
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
    >
      <NavSection
        frontmatter={frontmatter}
        key={frontmatter.title}
        code={code}
      />
      <Flex>
        {frontmatter?.previous && (
          <Flex
            sx={{
              flex: 1,
              justifyContent: "flex-start",
              py: 8,
            }}
          >
            <Link passHref href={frontmatter.previous}>
              <Button variant="link" leftIcon={<HiChevronLeft />}>
                <Heading as="h3" fontSize="lg">
                  {prettyPrintSlug(frontmatter.previous)}
                </Heading>
              </Button>
            </Link>
          </Flex>
        )}
        {frontmatter?.next && (
          <Flex
            sx={{
              flex: 1,
              justifyContent: "flex-end",
              py: 8,
            }}
          >
            <Link passHref href={frontmatter.next}>
              <Button variant="link" rightIcon={<HiChevronRight />}>
                <Heading as="h3" fontSize="lg">
                  {prettyPrintSlug(frontmatter.next)}
                </Heading>
              </Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </Page>
  );
};

export default Section;
