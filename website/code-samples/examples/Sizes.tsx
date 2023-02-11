import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, VStack } from "@chakra-ui/layout";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import * as React from "react";

const steps = [{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }];

type SizeValue = "sm" | "md" | "lg";

export const Sizes = ({
  variant,
}: {
  variant: "circles" | "circles-alt" | "simple" | undefined;
}) => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = useColorModeValue("gray.200", "gray.700");
  const [stepSize, setStepSize] = React.useState<SizeValue>("md");
  return (
    <Flex flexDir="column" width="100%">
      <VStack width="100%" mb={8} align="flex-start">
        <RadioGroup
          defaultValue="md"
          onChange={(val) => setStepSize(val as SizeValue)}
        >
          <HStack direction="row">
            <Radio value="sm">Small</Radio>
            <Radio value="md">Medium</Radio>
            <Radio value="lg">Large</Radio>
          </HStack>
        </RadioGroup>
      </VStack>
      <Steps
        size={stepSize}
        variant={variant}
        colorScheme="blue"
        activeStep={activeStep}
      >
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
