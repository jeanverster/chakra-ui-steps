import { chakra, useStyles } from '@chakra-ui/react';
import React from 'react';

interface StepLabelProps {
  isCurrentStep?: boolean;
  opacity: number;
  label?: string | React.ReactNode;
  description?: string;
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
  } = useStyles();

  const shouldRender = !!label || !!description;

  return shouldRender ? (
    <chakra.div
      aria-current={isCurrentStep ? 'step' : undefined}
      __css={labelContainer}
    >
      {!!label && (
        <chakra.span __css={{ mx: 2, opacity, ...labelStyles }}>
          {label}
        </chakra.span>
      )}
      {!!description && (
        <chakra.span __css={{ mx: 2, opacity, ...descriptionStyles }}>
          {description}
        </chakra.span>
      )}
    </chakra.div>
  ) : null;
};
