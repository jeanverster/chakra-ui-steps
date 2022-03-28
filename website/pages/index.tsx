import { Step1, Step2, Step3, Step4 } from "@/components";
import { Heading } from "@chakra-ui/layout";
import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { GiRocketFlight } from "react-icons/gi";
import { NavSection } from "../components/NavSection/NavSection";
import { getPost, getSections } from "../mdx/server";

export type Section = {
  frontmatter: FrontMatter;
  code: string;
};

export type FrontMatter = {
  title: string;
  date: string;
  description: string;
  cover: string;
  tags: string[];
  isPublished: boolean;
  coverLink: string;
  coverAttribution: string;
};

const steps = [
  { label: "Select Product", content: <Step1 /> },
  { label: "Home Type", content: <Step2 /> },
  { label: "Home Value", content: <Step3 /> },
  { label: "Finalise", content: <Step4 /> },
];

type HomeProps = {
  sections: Section[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allSections = getSections();
  const sections = [];

  for (const section of allSections) {
    const contents = await getPost(section.slug);
    sections.push(contents);
  }

  return {
    props: { sections: JSON.parse(JSON.stringify(sections)) },
  };
};

const Home: NextPage<HomeProps> = ({ sections }) => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <>
      {/* <Divider sx={{ mb: 12 }} /> */}
      <Steps colorScheme="blue" activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex p={4} sx={{ flexDir: "column", alignItems: "center" }}>
          <Box sx={{ p: 8 }}>
            <GiRocketFlight size={96} />
          </Box>
          <Heading>Woohoo!</Heading>
          <Box sx={{ mb: 8, mt: 4 }}>
            <Text>You&apos;ve completed the steps!</Text>
          </Box>
          <Button mx="auto" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            variant="ghost"
          >
            Prev
          </Button>
          <Button onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
      <Divider sx={{ mt: 12 }} />
      {sections.map(({ frontmatter, code }) => (
        <NavSection
          frontmatter={frontmatter}
          key={frontmatter.title}
          code={code}
        />
      ))}
    </>
  );
};

export default Home;
