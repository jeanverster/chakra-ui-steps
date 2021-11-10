import { Flex } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyles,
} from '@chakra-ui/system';
import { mode } from '@chakra-ui/theme-tools';
import { Collapse } from '@chakra-ui/transition';
import { dataAttr } from '@chakra-ui/utils';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { Connector } from '../Connector';
import { CheckIcon, CloseIcon } from '../Icons';

const MotionFlex = motion(Flex);
const AnimatedCloseIcon = motion(CloseIcon);
const AnimatedSpan = motion(chakra.span);

export interface StepProps extends HTMLChakraProps<'div'> {
  label?: string | React.ReactNode;
  description?: string;
  icon?: React.ComponentType<any>;
}

// Props which shouldn't be passed to to the Step component from the user
interface StepInternalConfig extends ThemingProps {
  index: number;
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isLastStep?: boolean;
  orientation?: 'vertical' | 'horizontal';
  isLoading?: boolean;
  isError?: boolean;
  state?: 'loading' | 'error';
  checkIcon?: React.ComponentType<any>;
  clickable?: boolean;
  onClickStep?: (index: number) => void;
}

const animationConfig = {
  transition: {
    duration: 0.15,
  },
  exit: { scale: 0, opacity: 0 },
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

interface FullStepProps extends StepProps, StepInternalConfig {}

export const Step = forwardRef<StepProps, 'div'>(
  (props, ref: React.Ref<any>) => {
    const {
      checkIcon: CustomCheckIcon,
      children,
      colorScheme: c,
      description: descriptionProp,
      icon: CustomIcon,
      index,
      isCompletedStep,
      isCurrentStep,
      isLastStep,
      label: labelProp,
      orientation,
      state,
      clickable,
      onClickStep,
      ...styleProps
    } = props as FullStepProps;

    const Icon = React.useMemo(() => (CustomIcon ? CustomIcon : null), [
      CustomIcon,
    ]);

    const Check = React.useMemo(
      () => (CustomCheckIcon ? CustomCheckIcon : CheckIcon),
      [CustomCheckIcon]
    );

    const {
      description,
      icon,
      label,
      labelContainer,
      step,
      stepContainer,
      stepIconContainer,
    } = useStyles();

    const stepStyles = {
      display: 'flex',
      position: 'relative',
      ...step,
    };

    const stepIconContainerStyles = {
      display: 'flex',
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      ...stepIconContainer,
    };

    const labelStyles = {
      fontWeight: 'medium',
      color: mode(`gray.900`, `gray.100`)(props),
      textAlign: 'center',
      fontSize: 'md',
      ...label,
    };

    const descriptionStyles = {
      marginTop: '-2px',
      color: mode(`gray.800`, `gray.200`)(props),
      textAlign: 'center',
      fontSize: 'sm',
      ...description,
    };

    const isError = state === 'error';
    const isLoading = state === 'loading';

    const hasVisited = isCurrentStep || isCompletedStep;

    const opacity = hasVisited ? 1 : 0.8;

    const isVertical = orientation === 'vertical';

    const handleClick = (index: number) => {
      if (clickable && onClickStep) {
        onClickStep(index);
      }
    };

    const renderIcon = React.useMemo(() => {
      if (isCompletedStep) {
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
        <AnimatedSpan key="label" __css={labelStyles} {...animationConfig}>
          {(index || 0) + 1}
        </AnimatedSpan>
      );
    }, [isCompletedStep, isCurrentStep, isError, isLoading, Icon, icon]);

    return (
      <>
        <chakra.div
          ref={ref}
          {...styleProps}
          onClick={() => handleClick(index)}
          aria-disabled={!hasVisited}
          __css={{
            opacity,
            flexDir: isVertical ? 'column' : 'row',
            alignItems: isVertical ? 'flex-start' : 'center',
            flex: isLastStep && !isVertical ? '0 0 auto' : '1 0 auto',
            justifyContent:
              isLastStep && !isVertical ? 'flex-end' : 'flex-start',
            _hover: {
              cursor: clickable ? 'pointer' : 'default',
            },
            ...stepStyles,
          }}
        >
          <chakra.div
            __css={{
              display: 'flex',
              flexDir: 'row',
              alignItems: 'center',
              ...stepContainer,
            }}
          >
            <chakra.div
              __css={stepIconContainerStyles}
              aria-current={isCurrentStep ? 'step' : undefined}
              data-invalid={dataAttr(isCurrentStep && isError)}
              data-highlighted={dataAttr(isCompletedStep)}
              data-clickable={dataAttr(clickable)}
            >
              <AnimatePresence exitBeforeEnter>{renderIcon}</AnimatePresence>
            </chakra.div>
            <chakra.div
              aria-current={isCurrentStep}
              __css={{
                display: 'flex',
                flexDir: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                ...labelContainer,
              }}
            >
              {!!labelProp && (
                <chakra.span __css={{ mx: 2, opacity, ...labelStyles }}>
                  {labelProp}
                </chakra.span>
              )}
              {!!descriptionProp && (
                <chakra.span __css={{ mx: 2, opacity, ...descriptionStyles }}>
                  {descriptionProp}
                </chakra.span>
              )}
            </chakra.div>
          </chakra.div>
          <Connector
            colorScheme={c}
            isLastStep={isLastStep}
            isVertical={isVertical}
            isCompletedStep={isCompletedStep || false}
            hasLabel={!!labelProp || !!descriptionProp}
          >
            <Collapse style={{ width: '100%' }} in={isCurrentStep}>
              {(isCurrentStep || isCompletedStep) && children}
            </Collapse>
          </Connector>
        </chakra.div>
      </>
    );
  }
);
