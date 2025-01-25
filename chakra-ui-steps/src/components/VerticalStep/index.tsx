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
      errorIcon: errorIconProp,
    } = props;

    const {
      checkIcon: checkIconContext,
      errorIcon: errorIconContext,
      isError,
      isLoading,
      variant,
      onClickStep,
      clickable,
      expandVerticalSteps,
    } = useStepsContext();

    const { step, stepIconContainer } = useStepsStyles();

    const opacity = hasVisited ? 1 : 0.8;
    const localIsLoading = isLoading || state === 'loading';
    const localIsError = isError || state === 'error';

    const active =
      variant === 'simple' ? isCompletedStep || isCurrentStep : isCompletedStep;
    const checkIcon = checkIconProp || checkIconContext;
    const errorIcon = errorIconProp || errorIconContext;

    const renderChildren = () => {
      if (!expandVerticalSteps) {
        return (
          <Collapse style={{ width: '100%' }} in={isCurrentStep}>
            {(isCurrentStep || isCompletedStep) && children}
          </Collapse>
        );
      }
      return children;
    };

    return (
      <chakra.div
        ref={ref}
        className="cui-steps__vertical-step"
        data-active={dataAttr(active)}
        data-clickable={dataAttr(clickable)}
        data-invalid={dataAttr(localIsError)}
        onClick={() => onClickStep?.(index || 0)}
        __css={step}
      >
        <Flex
          data-vertical={dataAttr(true)}
          className="cui-steps__vertical-step-container"
        >
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
              errorIcon={errorIcon}
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
          __css={{
            minH: '8px',
            paddingStart: stepIconContainer?.width ? `calc(${stepIconContainer.width})` : 0,
          }}
        >
          {renderChildren()}
        </chakra.div>
      </chakra.div>
    );
  }
);
