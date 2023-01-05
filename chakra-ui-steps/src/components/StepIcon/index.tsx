import { chakra, Flex, forwardRef, Spinner } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { motion } from 'framer-motion';
import React from 'react';
import { CheckIcon, WarningIcon } from '../Icons';
import { useStepsStyles } from '../Steps';

interface StepIconProps {
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isKeepError?: boolean;
  icon?: React.ComponentType<any>;
  index: number | undefined;
  checkIcon?: React.ComponentType<any>;
}

const MotionFlex = motion(Flex);
const AnimatedWarningIcon = motion(WarningIcon);
const AnimatedSpan = motion(chakra.span);

const animationConfig = {
  transition: {
    duration: 0.25,
  },
  exit: { scale: 0.5, opacity: 0 },
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export const StepIcon = forwardRef<StepIconProps, 'div'>((props, ref) => {
  const { icon, iconLabel, label } = useStepsStyles();

  const {
    isCompletedStep,
    isCurrentStep,
    isError,
    isLoading,
    isKeepError,
    icon: CustomIcon,
    index,
    checkIcon: CustomCheckIcon,
  } = props;

  const labelStyles = {
    fontWeight: 'medium',
    color: mode(`gray.900`, `gray.100`)(props),
    textAlign: 'center',
    fontSize: 'md',
    ...label,
  };

  const Icon = React.useMemo(
    () => (CustomIcon ? CustomIcon : null),
    [CustomIcon]
  );

  const Check = React.useMemo(
    () => (CustomCheckIcon ? CustomCheckIcon : CheckIcon),
    [CustomCheckIcon]
  );

  return React.useMemo(() => {
    if (isCompletedStep) {
      if (isError && isKeepError) {
        return (
          <AnimatedWarningIcon
            key="icon"
            color="white"
            {...animationConfig}
            style={icon}
          />
        );
      }
      return (
        <MotionFlex key="check-icon" {...animationConfig}>
          <Check color="white" style={icon} />
        </MotionFlex>
      );
    }
    if (isCurrentStep) {
      if (isError) {
        return (
          <AnimatedWarningIcon
            color="white"
            key="icon"
            {...animationConfig}
            style={icon}
          />
        );
      }
      if (isLoading)
        return (
          <Spinner
            width={icon.width as string}
            height={icon.height as string}
          />
        );
    }
    if (Icon)
      return (
        <MotionFlex key="step-icon" {...animationConfig}>
          <Icon style={icon} />
        </MotionFlex>
      );
    return (
      <AnimatedSpan
        ref={ref}
        key="label"
        style={iconLabel}
        __css={labelStyles}
        {...animationConfig}
      >
        {(index || 0) + 1}
      </AnimatedSpan>
    );
  }, [isCompletedStep, isCurrentStep, isError, isLoading, Icon, icon]);
});
