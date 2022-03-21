import { Services, YourName } from "@/components";
import { Page } from "@/layouts";
import { Button, Flex } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import type { NextPage } from "next";

const content = <Flex py={4}>Yo!</Flex>;

const steps = [
  { label: "Your Name", content: <YourName /> },
  { label: "Services", content: <Services /> },
  { label: "Budget", content },
  { label: "Finalise", content },
];

const Home: NextPage = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Page
      title="Chakra UI Steps"
      metaDescription="Steps component designed to work with Chakra UI"
      description="Chakra UI Steps makes it super easy to create multi-step interfaces in apps where you are already using Chakra UI. Use it in forms, onboarding, or anywhere you want to lead the user through some logical steps."
    >
      <Steps colorScheme="brand" activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length ? (
        <Flex p={4}>
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
    </Page>
  );
};

export default Home;
