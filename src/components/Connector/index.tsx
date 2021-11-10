import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  useStyles,
} from '@chakra-ui/system';
import { dataAttr } from '@chakra-ui/utils';
import * as React from 'react';

interface ConnectorProps extends HTMLChakraProps<'div'>, ThemingProps {
  isCompletedStep: boolean;
  isVertical: boolean;
  isLastStep?: boolean;
  hasLabel?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export const Connector = React.memo(
  ({
    isCompletedStep,
    isVertical,
    children,
    isLastStep,
    hasLabel,
  }: ConnectorProps) => {
    const { connector, stepIconContainer } = useStyles();

    const connectorStyles = {
      flex: 1,
      display: 'flex',
      ...connector,
    };

    const getMargin = () => {
      if (isVertical) return `calc(${stepIconContainer.width} / 2)`;
      if (!hasLabel) return 2;
      return 0;
    };

    return (
      <chakra.div
        __css={{
          ms: getMargin(),
          my: isVertical ? 2 : 0,
          ps: isVertical ? 4 : 0,
          me: isVertical ? 0 : 2,
          height: isVertical ? 'auto' : '2px',
          alignSelf: isVertical ? 'stretch' : 'auto',
          borderTopWidth: isLastStep || isVertical ? 0 : '2px',
          borderInlineStartWidth: isLastStep || !isVertical ? 0 : '2px',
          minHeight: isLastStep || !isVertical ? 'auto' : '1.5rem',
          borderColor: connector.borderColor,
          ...connectorStyles,
        }}
        data-highlighted={dataAttr(isCompletedStep)}
      >
        {isVertical && children}
      </chakra.div>
    );
  }
);
