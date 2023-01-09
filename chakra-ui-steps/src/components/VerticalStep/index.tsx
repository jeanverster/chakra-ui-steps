import { chakra, Collapse, Flex } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import React from 'react';
import { useStepsContext } from '../../context';
import { StepSharedProps } from '../../types';
import { StepIcon } from '../StepIcon';
import { StepIconContainer } from '../StepIconContainer';
import { StepLabel } from '../StepLabel';
import { useStepsStyles } from '../Steps';

type VerticalStepProps = StepSharedProps & {
  children?: React.ReactNode;
};

export const VerticalStep = React.forwardRef<HTMLDivElement, VerticalStepProps>(
  (props, ref) => {
    const {
      children,
      index,
      isCompletedStep,
      isCurrentStep,
      label,
      description,
      icon,
      hasVisited,
      state,
      checkIcon: checkIconProp,
    } = props;

    const {
      checkIcon: checkIconContext,
      isError,
      isLoading,
      variant,
      onClickStep,
      clickable,
    } = useStepsContext();

    const { step, stepIconContainer } = useStepsStyles();

    const opacity = hasVisited ? 1 : 0.8;
    const localIsLoading = isLoading || state === 'loading';
    const localIsError = isError || state === 'error';

    const highlighted =
      variant === 'simple' ? isCompletedStep || isCurrentStep : isCompletedStep;
    const checkIcon = checkIconProp || checkIconContext;

    return (
      <chakra.div
        ref={ref}
        className="cui-steps__vertical-step"
        data-highlighted={dataAttr(highlighted)}
        data-clickable={dataAttr(clickable)}
        data-invalid={dataAttr(localIsError)}
        onClick={() => onClickStep?.(index || 0)}
        __css={step}
      >
        <Flex className="cui-steps__vertical-step-container">
          <StepIconContainer
            {...{ isLoading: localIsLoading, isError: localIsError, ...props }}
          >
            <StepIcon
              {...{
                index,
                isError: localIsError,
                isLoading: localIsLoading,
                isCurrentStep,
                isCompletedStep,
              }}
              icon={icon}
              checkIcon={checkIcon}
            />
          </StepIconContainer>
          <StepLabel
            label={label}
            description={description}
            {...{ isCurrentStep, opacity }}
          />
        </Flex>
        <chakra.div
          className="cui-steps__vertical-step-content"
          __css={{ minH: '8px', ps: `calc(${stepIconContainer.width})` }}
        >
          <Collapse style={{ width: '100%' }} in={isCurrentStep}>
            {(isCurrentStep || isCompletedStep) && children}
          </Collapse>
        </chakra.div>
      </chakra.div>
    );
  }
);
