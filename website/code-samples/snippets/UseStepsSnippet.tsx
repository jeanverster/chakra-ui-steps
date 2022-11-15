import { useSteps } from "chakra-ui-steps";

export const MySteps = () => {
  const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  return (
    <div>
      <button onClick={nextStep}>Next</button>
      <button onClick={prevStep}>Prev</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setStep(2)}>Go to step 2</button>
      <p>Active step: {activeStep}</p>
    </div>
  );
};
