import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import * as React from "react";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";

const defaultSteps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
];

export const DynamicSteps = ({
  variant,
}: {
  variant: "circles" | "circles-alt" | "simple" | undefined;
}) => {
  const [steps, setSteps] = React.useState(defaultSteps);
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = useColorModeValue("gray.200", "gray.700");
  return (
    <Flex flexDir="column" width="100%">
      <ButtonGroup sx={{ mb: 8 }} size="sm" variant="outline" isAttached>
        <Button
          onClick={() => {
            setSteps((prev) => {
              if (prev.length === 3) return prev;
              const newSteps = [...prev];
              newSteps.pop();
              return newSteps;
            });
          }}
          disabled={steps.length === 3}
          leftIcon={<FiMinusSquare />}
        >
          Remove Step
        </Button>
        <Button
          onClick={() => {
            setSteps((prev) => {
              if (prev.length === 5) return prev;
              const newSteps = [...prev];
              newSteps.push({ label: `Step ${newSteps.length + 1}` });
              return newSteps;
            });
          }}
          disabled={steps.length === 5}
          leftIcon={<FiPlusSquare />}
        >
          Add Step
        </Button>
      </ButtonGroup>
      <Steps variant={variant} colorScheme="blue" activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Box sx={{ p: 8, bg, my: 8, rounded: "md" }}>
              <Heading fontSize="xl" textAlign="center">
                Step {index + 1}
              </Heading>
            </Box>
          </Step>
        ))}
      </Steps>
      {hasCompletedAllSteps && (
        <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
          <Heading fontSize="xl" textAlign={"center"}>
            Woohoo! All steps completed! 🎉
          </Heading>
        </Box>
      )}
      <Flex width="100%" justify="flex-end" gap={4}>
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              variant="ghost"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
