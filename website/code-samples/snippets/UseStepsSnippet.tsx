import { useSteps } from "chakra-ui-steps";

const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
  initialStep: 0,
});
