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
  isError,
  isLoading: isLoadingProp,
}: StepIconContainerProps) => {
  const { stepIconContainer } = useStepsStyles();
  const { clickable, isLoading: isLoadingContext } = useStepsContext();

  const isLoading = isLoadingProp || isLoadingContext;

  return (
    <chakra.div
      __css={stepIconContainer}
      className="cui-steps__step-icon-container"
      aria-current={isCurrentStep ? 'step' : undefined}
      data-invalid={dataAttr(isError && (isCurrentStep || isCompletedStep))}
      data-active={dataAttr(isCompletedStep)}
      data-clickable={dataAttr(clickable)}
      data-loading={dataAttr(isLoading && (isCurrentStep || isCompletedStep))}
    >
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </chakra.div>
  );
};
