import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  useStyles,
} from '@chakra-ui/system';
import { Collapse } from '@chakra-ui/transition';
import { dataAttr } from '@chakra-ui/utils';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { useStepsContext } from '../../context';
import { Connector } from '../Connector';
import { StepIcon } from '../StepIcon';
import { StepLabel } from '../StepLabel';

export interface StepProps extends HTMLChakraProps<'div'> {
  label?: string | React.ReactNode;
  description?: string;
  icon?: React.ComponentType<any>;
  isCompletedStep?: boolean;
}

// Props which shouldn't be passed to to the Step component from the user
interface StepInternalConfig extends ThemingProps {
  index: number;
  isCompletedStep?: boolean;
  isCurrentStep?: boolean;
  isLastStep?: boolean;
}

interface FullStepProps extends StepProps, StepInternalConfig {}

export const Step = forwardRef<StepProps, 'div'>(
  (props, ref: React.Ref<any>) => {
    const {
      children,
      description,
      icon,
      index,
      isCompletedStep,
      isCurrentStep,
      isLastStep,
      label,
      ...styleProps
    } = props as FullStepProps;

    const {
      isVertical,
      isError,
      isLoading,
      isLabelVertical,
      checkIcon,
      onClickStep,
      clickable,
      setWidths,
      stepCount,
    } = useStepsContext();

    const { step, stepContainer, stepIconContainer } = useStyles();

    const hasVisited = isCurrentStep || isCompletedStep;

    const opacity = hasVisited ? 1 : 0.8;

    const handleClick = (index: number) => {
      if (clickable && onClickStep) {
        onClickStep(index);
      }
    };

    const containerRef = React.createRef<HTMLDivElement>();

    React.useEffect(() => {
      if (containerRef && containerRef.current && setWidths) {
        setWidths(prev => {
          if (prev.length === stepCount) {
            return [containerRef.current?.offsetWidth || 0];
          }
          return [...prev, containerRef.current?.offsetWidth || 0];
        });
      }
    }, [stepIconContainer.width, stepIconContainer.height]);

    return (
      <>
        <chakra.div
          ref={ref}
          onClick={() => handleClick(index)}
          aria-disabled={!hasVisited}
          __css={{
            opacity,
            flexDir: isVertical ? 'column' : 'row',
            alignItems: isVertical || isLabelVertical ? 'flex-start' : 'center',
            flex: isLastStep && !isVertical ? '0 0 auto' : '1 0 auto',
            justifyContent:
              isLastStep && !isVertical ? 'flex-end' : 'flex-start',
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
              flexDir: isLabelVertical ? 'column' : 'row',
              ...stepContainer,
            }}
          >
            <chakra.div
              __css={stepIconContainer}
              aria-current={isCurrentStep ? 'step' : undefined}
              data-invalid={dataAttr(isCurrentStep && isError)}
              data-highlighted={dataAttr(isCompletedStep)}
              data-clickable={dataAttr(clickable)}
            >
              <AnimatePresence exitBeforeEnter>
                <StepIcon
                  {...{
                    index,
                    isError,
                    isLoading,
                    isCurrentStep,
                    isCompletedStep,
                  }}
                  icon={icon}
                  checkIcon={checkIcon}
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
        </chakra.div>
      </>
    );
  }
);
