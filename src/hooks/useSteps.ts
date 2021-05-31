import * as React from 'react';
type UseSteps = {
  initialStep: number;
};

export function useSteps({ initialStep }: UseSteps) {
  const [activeStep, setActiveStep] = React.useState(initialStep);

  const nextStep = () => {
    setActiveStep(prev => prev + 1);
  };

  const prevStep = () => {
    setActiveStep(prev => prev - 1);
  };

  const reset = () => {
    setActiveStep(initialStep);
  };

  return { nextStep, prevStep, reset, activeStep };
}
