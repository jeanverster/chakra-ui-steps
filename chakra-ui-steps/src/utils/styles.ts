import { SystemStyleObject } from '@chakra-ui/react';
import { StepsContextValue } from '../context';

type BaseStyleArgs = Partial<StepsContextValue> & {
  stepHeight?: string;
  inactiveColor?: string;
  activeColor?: string;
};

export const getCirclesHorizontalBaseStyles = ({
  colorScheme: c,
  trackColor: t,
  clickable,
}: BaseStyleArgs): SystemStyleObject => ({
  display: 'flex',
  alignItems: 'center',
  '&:not(:last-child)': {
    flex: 1,
  },
  '&:not(:last-child):after': {
    content: '""',
    flex: 1,
    height: '2px',
    backgroundColor: `${t}`,
    mx: 3,
    transition: 'background-color .2s ease',
  },
  _active: {
    '&:not(:last-child):after': {
      backgroundColor: `${c}.500`,
      backgroundPosition: 'left',
      transition: 'background-position .2s ease-in-out',
    },
  },
  _hover: {
    cursor: clickable ? 'pointer' : 'default',
  },
});

export const getCirclesAlternateBaseStyles = ({
  colorScheme,
  trackColor,
  clickable,
  inactiveColor,
  stepHeight,
}: BaseStyleArgs): SystemStyleObject => ({
  ...getCirclesHorizontalBaseStyles({ colorScheme, trackColor, clickable }),
  justifyContent: 'flex-start',
  flexDirection: 'column',
  flex: 1,
  '&:not(:last-child):after': {
    content: '""',
    backgroundColor: trackColor || inactiveColor,
    height: '2px',
    order: -1,
    insetInline: '50%',
    position: 'relative',
    top: `calc(${stepHeight} / 2)`,
    transition: 'background-color .2s ease',
    width: `calc(100% - ${stepHeight} - calc(8px * 2))`,
  },
});

export const getCirclesVerticalBaseStyles = ({
  stepHeight,
  colorScheme,
  trackColor,
  clickable,
}: BaseStyleArgs): SystemStyleObject => ({
  position: 'relative',
  gap: 4,
  pb: 4,
  display: 'flex',
  flexDir: 'column',
  '--size': stepHeight,
  '--gap': '8px',
  _active: {
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
    insetInline: 'calc(var(--size) / 2)',
    position: 'absolute',
    top: 'calc(var(--size) + var(--gap))',
    width: '2px',
  },
  _hover: {
    cursor: clickable ? 'pointer' : 'default',
  },
});

export const getCirclesStepIconContainerBaseStyles = ({
  inactiveColor,
  activeColor,
}: BaseStyleArgs): SystemStyleObject => ({
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  bg: inactiveColor,
  borderColor: inactiveColor,
  _activeStep: {
    borderColor: activeColor,
    _invalid: {
      bg: 'red.400',
      borderColor: 'red.400',
    },
  },
  _active: {
    bg: activeColor,
    borderColor: activeColor,
    _invalid: {
      bg: 'red.400',
      borderColor: 'red.400',
    },
  },
  '&[data-clickable]:hover': {
    borderColor: activeColor,
  },
});
