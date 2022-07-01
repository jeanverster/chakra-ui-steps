import { Flex } from '@chakra-ui/layout';
import { chakra, Collapse, useStyles } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import React from 'react';
import { useStepsContext } from '../../context';
import { StepSharedProps } from '../../types';
import { StepIcon } from '../StepIcon';
import { StepIconContainer } from '../StepIconContainer';
import { StepLabel } from '../StepLabel';

type VerticalStepProps = StepSharedProps & {
  children?: React.ReactNode;
};

export const VerticalStep = React.forwardRef<HTMLLIElement, VerticalStepProps>(
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
    } = props;

    const { checkIcon, isError, isLoading, trackColor, colorScheme } =
      useStepsContext();

    const { stepIconContainer } = useStyles();

    const opacity = hasVisited ? 1 : 0.8;

    return (
      <chakra.li
        ref={ref}
        className="cui-steps__vertical-step"
        data-highlighted={dataAttr(isCompletedStep)}
        __css={{
          position: 'relative',
          gap: 4,
          pb: 4,
          display: 'flex',
          flexDir: 'column',
          '--size': stepIconContainer.height as string,
          '--gap': '8px',
          _highlighted: {
            pb: 4,
            '&:not(:last-child):after': {
              backgroundColor: `${colorScheme}.500`,
              backgroundPosition: 'left',
              transition: 'background-position .2s ease-in-out',
            },
          },
          '&:not(:last-child):after': {
            content: '""',
            backgroundColor: trackColor,
            bottom: 'var(--gap)',
            left: 0,
            position: 'absolute',
            top: 'calc(var(--size) + var(--gap))',
            transform: `translateX(calc(var(--size) / 2))`,
            width: '2px',
          },
        }}
      >
        <Flex>
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
        </Flex>
        <chakra.div
          __css={{ minH: '8px', pl: `calc(${stepIconContainer.width})` }}
        >
          <Collapse style={{ width: '100%' }} in={isCurrentStep}>
            {(isCurrentStep || isCompletedStep) && children}
          </Collapse>
        </chakra.div>
      </chakra.li>
    );
  }
);
