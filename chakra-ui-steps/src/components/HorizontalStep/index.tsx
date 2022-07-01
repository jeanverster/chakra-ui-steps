import { chakra, CSSObject } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import * as React from 'react';
import { StepsContextValue, useStepsContext } from '../../context';
import { StepSharedProps } from '../../types';
import { StepIcon } from '../StepIcon';
import { StepIconContainer } from '../StepIconContainer';
import { StepLabel } from '../StepLabel';
import { useStepsStyles } from '../Steps';

const getStyles = ({
  isLabelVertical,
  colorScheme: c,
  stepHeight,
  trackColor: t,
}: Partial<StepsContextValue> & {
  stepHeight?: string;
}): CSSObject => {
  const base = {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child):after': {
      content: '""',
      flex: 1,
      height: '2px',
      backgroundColor: `${t}`,
      me: 3,
      transition: 'background-color .2s ease',
    },
    _highlighted: {
      '&:not(:last-child):after': {
        backgroundColor: `${c}.500`,
        backgroundPosition: 'left',
        transition: 'background-position .2s ease-in-out',
      },
    },
  };
  if (isLabelVertical) {
    return {
      ...base,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      flex: 1,
      '&:not(:last-child):after': {
        content: '""',
        backgroundColor: `${t}`,
        height: '2px',
        left: `50%`,
        order: -1,
        position: 'relative',
        top: `calc(${stepHeight} / 2)`,
        transition: 'background-color .2s ease',
        width: `calc(100% - ${stepHeight} - calc(8px * 2))`,
      },
    };
  }
  return {
    ...base,
    '&:not(:last-child)': {
      flex: 1,
    },
  };
};

export const HorizontalStep = React.forwardRef<HTMLLIElement, StepSharedProps>(
  (props, ref) => {
    const { step, stepContainer, stepIconContainer } = useStepsStyles();

    const {
      isError,
      isLoading,
      isLabelVertical,
      checkIcon,
      onClickStep,
      clickable,
      colorScheme,
      trackColor,
    } = useStepsContext();

    const {
      index,
      isCompletedStep,
      isCurrentStep,
      hasVisited,
      icon,
      label,
      description,
    } = props;

    const opacity = hasVisited ? 1 : 0.8;

    return (
      <chakra.li
        aria-disabled={!hasVisited}
        className="cui-steps__horizontal-step"
        data-highlighted={dataAttr(isCompletedStep)}
        onClick={() => onClickStep?.(index || 0)}
        ref={ref}
        __css={{
          ...getStyles({
            trackColor,
            colorScheme,
            isLabelVertical,
            stepHeight: stepIconContainer.height as string,
          }),
          _hover: {
            cursor: clickable ? 'pointer' : 'default',
          },
          ...step,
        }}
      >
        <chakra.div
          __css={{
            flexDir: isLabelVertical ? 'column' : 'row',
            ...stepContainer,
          }}
        >
          <StepIconContainer {...props}>
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
          </StepIconContainer>
          <StepLabel
            label={label}
            description={description}
            {...{ isCurrentStep, opacity }}
          />
        </chakra.div>
      </chakra.li>
    );
  }
);
