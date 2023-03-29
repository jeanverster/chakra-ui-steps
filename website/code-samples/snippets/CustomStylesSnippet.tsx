import { Step, Steps, useSteps } from "chakra-ui-steps";
import { AiFillCheckCircle } from "react-icons/ai";

const steps = [{ label: "Login" }, { label: "Verification" }, { label: "Pay" }];

export const CustomStyles = () => {
  const { activeStep } = useSteps({
    initialStep: 0,
  });
  return (
    <Steps
      checkIcon={AiFillCheckCircle}
      colorScheme="cyan"
      activeStep={activeStep}
      sx={{
        "& .cui-steps__step-icon-container": {
          bg: "cyan.400",
          color: "white",
          borderRadius: "4px",
          "&:hover": {
            bg: "cyan.400",
            cursor: "pointer",
          },
          // use _active attribute to target the active step
          _active: {
            bg: "cyan.900",
          },
          // you can also use the _dark attribute to target specific color modes
          _dark: {
            _active: {
              bg: "cyan.700",
            },
            bg: "cyan.800",
          },
        },
      }}
    >
      {steps.map(({ label }, index) => (
        <Step label={label} key={label}>
          <div>Step {index + 1}</div>
        </Step>
      ))}
    </Steps>
  );
};
