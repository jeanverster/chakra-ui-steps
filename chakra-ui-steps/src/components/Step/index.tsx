import { forwardRef, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import * as React from 'react';
import { useStepsContext } from '../../context';
import { HorizontalStep } from '../HorizontalStep';
import { VerticalStep } from '../VerticalStep';

export interface StepProps extends HTMLChakraProps<'li'> {
  label?: string | React.ReactNode;
  description?: string;
  icon?: React.ComponentType<any>;
  state?: 'loading' | 'error';
  checkIcon?: React.ComponentType<any>;
  isCompletedStep?: boolean;
  isKeepError?: boolean;
}

// Props which shouldn't be passed to to the Step component from the user
interface StepInternalConfig extends ThemingProps {
  index: number;
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isLastStep?: boolean;
}

interface FullStepProps extends StepProps, StepInternalConfig {}

export const Step = forwardRef<StepProps, 'li'>(
  (props, ref: React.Ref<any>) => {
    const {
      children,
      description,
      icon,
      state,
      checkIcon,
      index,
      isCompletedStep,
      isCurrentStep,
      isLastStep,
      isKeepError,
      label,
    } = props as FullStepProps;

    const { isVertical, isError, isLoading, clickable } = useStepsContext();

    const hasVisited = isCurrentStep || isCompletedStep;

    const sharedProps = {
      isLastStep,
      isCompletedStep,
      isCurrentStep,
      index,
      isError,
      isLoading,
      clickable,
      label,
      description,
      hasVisited,
      icon,
    };

    const renderStep = () => {
      switch (isVertical) {
        case true:
          return (
            <VerticalStep ref={ref} {...sharedProps}>
              {children}
            </VerticalStep>
          );
        default:
          return <HorizontalStep ref={ref} {...sharedProps} />;
      }
    };

    return renderStep();
  }
);
