import { chakra } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import * as React from 'react';
import { useStepsContext } from '../../context';
import { StepSharedProps } from '../../types';
import { StepIcon } from '../StepIcon';
import { StepIconContainer } from '../StepIconContainer';
import { StepLabel } from '../StepLabel';
import { useStepsStyles } from '../Steps';

export const HorizontalStep = React.forwardRef<HTMLDivElement, StepSharedProps>(
  (props, ref) => {
    const { step, stepContainer } = useStepsStyles();

    const { isError, isLoading, checkIcon, onClickStep, variant, clickable } =
      useStepsContext();

    const {
      index,
      isCompletedStep,
      isCurrentStep,
      hasVisited,
      icon,
      label,
      description,
      isKeepError,
      state,
    } = props;

    const localIsError = isError || state === 'error';

    const opacity = hasVisited ? 1 : 0.8;

    const highlighted =
      variant === 'simple' || variant === 'panels'
        ? isCompletedStep || isCurrentStep
        : isCompletedStep;

    return (
      <chakra.div
        aria-disabled={!hasVisited}
        className="cui-steps__horizontal-step"
        data-highlighted={dataAttr(highlighted)}
        data-invalid={dataAttr(localIsError)}
        data-clickable={dataAttr(clickable)}
        onClick={() => onClickStep?.(index || 0)}
        ref={ref}
        __css={step}
      >
        <chakra.div
          className="cui-steps__horizontal-step-container"
          __css={stepContainer}
        >
          <StepIconContainer {...{ isError: localIsError, ...props }}>
            <StepIcon
              {...{
                index,
                isLoading,
                isCurrentStep,
                isCompletedStep,
                isKeepError,
                isError: localIsError,
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
        </chakra.div>
      </chakra.div>
    );
  }
);
