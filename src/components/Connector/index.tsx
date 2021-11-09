import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  chakra,
  HTMLChakraProps,
  ThemingProps,
  useStyles,
  useTheme,
} from '@chakra-ui/system';
import { getColor } from '@chakra-ui/theme-tools';
import { motion } from 'framer-motion';
import * as React from 'react';

interface ConnectorProps extends HTMLChakraProps<'div'>, ThemingProps {
  isCompletedStep: boolean;
  isVertical: boolean;
  isLastStep?: boolean;
  hasLabel?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

const MotionDiv = motion(chakra.div);

export const Connector = React.memo(
  ({
    colorScheme: c,
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

    const theme = useTheme();

    const activeBg = useColorModeValue(`${c}.500`, `${c}.200`);

    const inactiveBg = useColorModeValue(`gray.200`, `gray.700`);

    const rawInitialColor = getColor(theme, inactiveBg);

    const rawActiveColor = getColor(theme, activeBg);

    const getMargin = () => {
      if (isVertical) return `calc(${stepIconContainer.width} / 2)`;
      if (!hasLabel) return 2;
      return 0;
    };

    return (
      <MotionDiv
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
          ...connectorStyles,
        }}
        initial={{
          borderColor: rawInitialColor,
        }}
        animate={{
          borderColor: isCompletedStep ? rawActiveColor : rawInitialColor,
        }}
      >
        {isVertical && children}
      </MotionDiv>
    );
  }
);
