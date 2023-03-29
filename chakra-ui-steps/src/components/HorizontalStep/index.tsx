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

    const {
      isError,
      isLoading,
      onClickStep,
      variant,
      clickable,
      checkIcon: checkIconContext,
      errorIcon: errorIconContext,
    } = useStepsContext();

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
      checkIcon: checkIconProp,
      errorIcon: errorIconProp,
    } = props;

    const localIsLoading = isLoading || state === 'loading';
    const localIsError = isError || state === 'error';

    const opacity = hasVisited ? 1 : 0.8;

    const active =
      variant === 'simple' ? isCompletedStep || isCurrentStep : isCompletedStep;

    const checkIcon = checkIconProp || checkIconContext;
    const errorIcon = errorIconProp || errorIconContext;

    return (
      <chakra.div
        aria-disabled={!hasVisited}
        className="cui-steps__horizontal-step"
        data-active={dataAttr(active)}
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
          <StepIconContainer
            {...{ ...props, isError: localIsError, isLoading: localIsLoading }}
          >
            <StepIcon
              {...{
                index,
                isCompletedStep,
                isCurrentStep,
                isError: localIsError,
                isKeepError,
                isLoading: localIsLoading,
              }}
              icon={icon}
              checkIcon={checkIcon}
              errorIcon={errorIcon}
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
