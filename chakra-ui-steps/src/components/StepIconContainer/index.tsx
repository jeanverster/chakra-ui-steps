import { chakra } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import { AnimatePresence } from 'framer-motion';
import { useStepsContext } from '../../context';
import { StepSharedProps } from '../../types';
import { useStepsStyles } from '../Steps';

type StepIconContainerProps = StepSharedProps & {
  children?: React.ReactNode;
};

export const StepIconContainer = ({
  isCurrentStep,
  isCompletedStep,
  children,
}: StepIconContainerProps) => {
  const { stepIconContainer } = useStepsStyles();
  const { isError, clickable } = useStepsContext();
  return (
    <chakra.div
      __css={stepIconContainer}
      aria-current={isCurrentStep ? 'step' : undefined}
      data-invalid={dataAttr(isCurrentStep && isError)}
      data-highlighted={dataAttr(isCompletedStep)}
      data-clickable={dataAttr(clickable)}
    >
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </chakra.div>
  );
};
