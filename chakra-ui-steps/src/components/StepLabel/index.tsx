import { chakra, useStyles } from '@chakra-ui/react';
import React from 'react';
import { useStepsContext } from '../../context/index';

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

  const { isLabelVertical } = useStepsContext();

  const shouldRender = !!label || !!description;

  return shouldRender ? (
    <chakra.div
      aria-current={isCurrentStep ? 'step' : undefined}
      __css={{
        textAlign: isLabelVertical ? 'center' : 'left',
        alignItems: isLabelVertical ? 'center' : 'flex-start',
        ...labelContainer,
      }}
    >
      {!!label && (
        <chakra.span
          __css={{
            mx: isLabelVertical ? 0 : 2,
            mt: isLabelVertical ? 1 : 0,
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
            mx: isLabelVertical ? 0 : 2,
            mt: isLabelVertical ? 2 : 0,
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
