import { ReactHookFormExample } from "@/components";
import { Page } from "@/layouts";
import { FrontMatter } from "@/types";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { getSection, getSections } from "../mdx/server";

export type Section = {
  frontmatter: FrontMatter;
  code: string;
};

type HomeProps = {
  sections: Section[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allSections = getSections();
  const sections = [];

  for (const section of allSections) {
    const contents = await getSection(section.slug);
    sections.push(contents);
  }

  sections.sort((a, b) => a.frontmatter.order - b.frontmatter.order);

  return {
    props: { sections: JSON.parse(JSON.stringify(sections)) },
  };
};

const Home: NextPage<HomeProps> = ({ sections }) => {
  return (
    <Page
      title="Chakra UI Steps"
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Chakra UI Steps makes it super easy to create multi-step interfaces in apps where you are already using Chakra UI. Use it in forms, onboarding, or anywhere you want to lead the user through some logical steps."
    >
      <ReactHookFormExample />
    </Page>
  );
};

export default Home;
