import { chakra } from '@chakra-ui/react';
import React from 'react';
import { useStepsStyles } from '../Steps';

interface StepLabelProps {
  isCurrentStep?: boolean;
  opacity: number;
  label?: string | React.ReactNode;
  description?: string | null;
}

export const StepLabel = ({
  isCurrentStep,
  opacity,
  label,
  description,
}: StepLabelProps) => {
  const {
    labelContainer,
    label: labelStyles,
    description: descriptionStyles,
  } = useStepsStyles();

  const shouldRender = !!label || !!description;

  return shouldRender ? (
    <chakra.div
      aria-current={isCurrentStep ? 'step' : undefined}
      __css={labelContainer}
    >
      {!!label && (
        <chakra.span
          __css={{
            opacity,
            ...labelStyles,
          }}
        >
          {label}
        </chakra.span>
      )}
      {!!description && (
        <chakra.span
          __css={{
            opacity,
            ...descriptionStyles,
          }}
        >
          {description}
        </chakra.span>
      )}
    </chakra.div>
  ) : null;
};
