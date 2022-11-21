import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/system';
import { useMultiStyleConfig } from "@chakra-ui/react"
import { Collapse } from '@chakra-ui/transition';
import { dataAttr } from '@chakra-ui/utils';
import { AnimatePresence } from 'framer-motion';
import { useStepsContext } from '../../context';
import { Connector } from '../Connector';
import { StepIcon } from '../StepIcon';
import { StepLabel } from '../StepLabel';
import React, { ComponentType, ReactNode, Ref, RefCallback, useCallback } from 'react';

export interface StepProps extends HTMLChakraProps<'li'> {
  label?: string | ReactNode;
  description?: string;
  icon?: ComponentType<any>;
  state?: 'loading' | 'error';
  checkIcon?: ComponentType<any>;
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
  (props, ref: Ref<any>) => {
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
      ...styleProps
    } = props as FullStepProps;
    
    const {
      isVertical,
      isError,
      isLoading,
      isLabelVertical,
      checkIcon: defaultCheckIcon,
      onClickStep,
      clickable,
      setWidths,
      stepCount,
    } = useStepsContext();

    const {step, stepContainer, stepIconContainer} = useMultiStyleConfig("Steps");

    const hasVisited = isCurrentStep || isCompletedStep;

    const opacity = hasVisited ? 1 : 0.8;

    const handleClick = (index: number) => {
      if (clickable && onClickStep) {
        onClickStep(index);
      }
    };

    const containerRef: RefCallback<HTMLDivElement> = useCallback(
      (node) => {
        if (node && setWidths) {
          setWidths((prev) => {
            if (prev.length === stepCount) {
              return [node.offsetWidth || 0];
            }
            return [...prev, node.offsetWidth || 0];
          });
        }
      },
      [stepIconContainer?.width, stepIconContainer?.height]
    );

    return (
      <>
        <chakra.li
          ref={ref}
          onClick={() => handleClick(index)}
          aria-disabled={!hasVisited}
          __css={{
            opacity,
            flexDirection: isVertical ? 'column' : 'row',
            alignItems: isVertical || isLabelVertical ? 'flex-start' : 'center',
            flex: isLastStep && !isVertical ? '0 0 auto' : '1 0 auto',
            justifyContent: isLastStep && !isVertical ? 'flex-end' : 'flex-start',
            _hover: {
              cursor: clickable ? 'pointer' : 'default',
            },
            ...step,
          }}
          {...styleProps}
        >
          <chakra.div
            ref={containerRef}
            __css={{
              flexDirection: isLabelVertical ? 'column' : 'row',
              ...stepContainer,
            }}
          >
            <chakra.div
              __css={stepIconContainer}
              aria-current={
                (hasVisited && isKeepError) || isCurrentStep
                  ? 'step'
                  : undefined
              }
              data-invalid={dataAttr(
                ((hasVisited && isKeepError) || isCurrentStep) &&
                  (isError || state === 'error')
              )}
              data-highlighted={dataAttr(isCompletedStep)}
              data-clickable={dataAttr(clickable)}
            >
              <AnimatePresence mode="wait">
                <StepIcon
                  {...{
                    index,
                    isError: isError || state === 'error',
                    isLoading: isLoading || state === 'loading',
                    isCurrentStep,
                    isCompletedStep,
                    isKeepError,
                  }}
                  icon={icon}
                  checkIcon={checkIcon ?? defaultCheckIcon}
                />
              </AnimatePresence>
            </chakra.div>
            <StepLabel
              label={label}
              description={description}
              {...{ isCurrentStep, opacity }}
            />
          </chakra.div>
          <Connector
            index={index}
            isLastStep={isLastStep}
            hasLabel={!!label || !!description}
            isCompletedStep={isCompletedStep || false}
          >
            <Collapse style={{ width: '100%' }} in={isCurrentStep}>
              {(isCurrentStep || isCompletedStep) && children}
            </Collapse>
          </Connector>
        </chakra.li>
      </>
    );
  }
);
