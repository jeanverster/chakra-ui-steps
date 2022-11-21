import { chakra, Flex, forwardRef, Spinner, useMultiStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { motion } from 'framer-motion';
import { CheckIcon, CloseIcon } from '../Icons';
import React, { ComponentType, useMemo } from 'react';

interface StepIconProps {
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isKeepError?: boolean;
  icon?: ComponentType<any>;
  index: number;
  checkIcon?: ComponentType<any>;
}

const MotionFlex = motion(Flex);
const AnimatedCloseIcon = motion(CloseIcon);
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
  const { icon, iconLabel, label } = useMultiStyleConfig("Steps", props);

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

  const Icon = useMemo(
    () => (CustomIcon ? CustomIcon : null),
    [CustomIcon]
  );

  const Check = useMemo(
    () => (CustomCheckIcon ? CustomCheckIcon : CheckIcon),
    [CustomCheckIcon]
  );

  return useMemo(() => {
    if (isCompletedStep) {
      if (isError && isKeepError) {
        return (
          <AnimatedCloseIcon
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
      if (isError)
        return (
          <AnimatedCloseIcon
            key="icon"
            color="white"
            {...animationConfig}
            style={icon}
          />
        );
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
