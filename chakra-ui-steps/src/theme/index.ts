import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import {
  anatomy,
  mode,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';
import {
  getCirclesAlternateBaseStyles,
  getCirclesHorizontalBaseStyles,
  getCirclesStepIconContainerBaseStyles,
  getCirclesVerticalBaseStyles,
} from '../utils/styles';

const parts = anatomy('steps').parts(
  'description',
  'icon',
  'iconLabel',
  'label',
  'labelContainer',
  'step',
  'stepContainer',
  'stepIconContainer',
  'root'
);

export const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyleIcon: SystemStyleObject = {
  strokeWidth: '2px',
};

const baseStyleLabel: SystemStyleFunction = (props) => ({
  color: mode(`gray.900`, `gray.100`)(props),
  fontWeight: 'medium',
  textAlign: 'center',
  fontSize: 'md',
});

const baseStyleDescription: SystemStyleFunction = (props) => ({
  color: mode(`gray.800`, `gray.200`)(props),
  mt: '-2px',
  textAlign: 'center',
  fontSize: 'sm',
});

const baseStyleRoot: SystemStyleFunction = ({ stepCount, orientation }) => ({
  justifyContent: stepCount === 1 ? 'flex-end' : 'space-between',
  flexDir: orientation === 'vertical' ? 'column' : 'row',
  fontFamily: 'heading',
  textAlign: 'center',
  width: '100%',
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',
});

const baseStyleStepContainer: SystemStyleFunction = () => ({
  display: 'flex',
  alignItems: 'center',
});

const baseStyleStep = {
  display: 'flex',
  position: 'relative',
};

const baseStyleLabelContainer: SystemStyleFunction = () => {
  return {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
  };
};

const baseStyle = definePartsStyle((props) => ({
  description: baseStyleDescription(props),
  icon: baseStyleIcon,
  iconLabel: baseStyleLabel(props),
  label: baseStyleLabel(props),
  labelContainer: baseStyleLabelContainer(props),
  step: baseStyleStep,
  stepContainer: baseStyleStepContainer(props),
  root: baseStyleRoot(props),
}));

const sizes = {
  sm: definePartsStyle({
    stepIconContainer: {
      width: '32px',
      height: '32px',
      borderWidth: '2px',
    },
    icon: {
      width: '14px',
      height: '14px',
    },
    label: {
      fontWeight: 'medium',
      textAlign: 'center',
      fontSize: 'sm',
    },
    description: {
      fontWeight: '300',
      textAlign: 'center',
      fontSize: 'xs',
    },
  }),
  md: definePartsStyle({
    stepIconContainer: {
      width: '40px',
      height: '40px',
      borderWidth: '2px',
    },
    icon: {
      width: '18px',
      height: '18px',
    },
    label: {
      fontWeight: 'medium',
      textAlign: 'center',
      fontSize: 'md',
    },
    description: {
      fontWeight: '300',
      textAlign: 'center',
      fontSize: 'sm',
    },
  }),
  lg: definePartsStyle({
    stepIconContainer: {
      width: '48px',
      height: '48px',
      borderWidth: '2px',
    },
    icon: {
      width: '22px',
      height: '22px',
    },
    label: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 'lg',
    },
    description: {
      fontWeight: '300',
      textAlign: 'center',
      fontSize: 'md',
    },
  }),
};

const variantCircles = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  const inactiveColor = mode('gray.200', 'gray.700')(props);
  const activeColor = `${c}.500`;
  // @ts-ignore
  const stepHeight = sizes[props.size].stepIconContainer.height;
  return {
    stepIconContainer: getCirclesStepIconContainerBaseStyles({
      inactiveColor,
      activeColor,
    }),
    labelContainer: {
      flexDir: 'column',
      alignItems: props.orientation === 'horizontal' ? 'center' : 'flex-start',
      ms: props.orientation === 'horizontal' ? 0 : 3,
    },
    step:
      props.orientation === 'horizontal'
        ? getCirclesHorizontalBaseStyles({ ...props, stepHeight })
        : getCirclesVerticalBaseStyles({ ...props, stepHeight }),
  };
});

const variantCirclesAlt = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  const inactiveColor = mode('gray.200', 'gray.700')(props);
  const activeColor = `${c}.500`;
  // @ts-ignore
  const stepHeight = sizes[props.size].stepIconContainer.height;
  return {
    stepIconContainer: {
      ...getCirclesStepIconContainerBaseStyles({
        inactiveColor,
        activeColor,
      }),
      flexDir: 'column',
    },
    stepContainer: {
      flexDir: 'column',
    },
    labelContainer: {
      flexDir: 'column',
      alignItems: props.orientation === 'horizontal' ? 'center' : 'flex-start',
      ms: props.orientation === 'horizontal' ? 0 : 3,
    },
    step:
      props.orientation === 'horizontal'
        ? getCirclesAlternateBaseStyles({ ...props, stepHeight })
        : getCirclesVerticalBaseStyles({ ...props, stepHeight }),
  };
});

const variantSimple = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  const inactiveColor = mode('gray.200', 'gray.700')(props);
  const activeColor = `${c}.500`;
  const isVertical = props.orientation === 'vertical';
  return {
    stepIconContainer: {
      display: 'none',
    },
    stepContainer: {
      flex: 1,
      py: 2,
      flexDir: 'row',
      alignItems: 'center',
    },
    label: {
      mx: 0,
      mt: isVertical ? 0 : 2,
    },
    labelContainer: {
      flexDir: 'column',
      alignItems: 'flex-start',
    },
    description: {
      mx: 0,
    },
    root: {
      gap: 4,
    },
    step: {
      flexDir: 'column',
      position: 'relative',
      flex: 1,
      borderTopWidth: isVertical ? 0 : 3,
      borderColor: props?.trackColor || inactiveColor,
      '&:not(:last-child):after': {
        display: 'none',
      },
      transition: 'border-color .2s ease',
      _highlighted: {
        transition: 'border-color .2s ease',
        borderColor: activeColor,
        '& .cui-steps__vertical-step-container': {
          borderColor: activeColor,
        },
      },
      _invalid: {
        borderColor: 'red.500',
        '& .cui-steps__vertical-step-container': {
          borderColor: 'red.500',
        },
      },
      '& .cui-steps__vertical-step-container': {
        borderLeftWidth: 3,
        py: 2,
        ps: 3,
        display: 'flex',
        justifyContent: 'flex-start',
      },
      '& .cui-steps__vertical-step-content': {
        ps: 0,
        py: 0,
      },
      '&[data-clickable]:hover': {
        borderColor: activeColor,
        cursor: 'pointer',
        backgroundColor: mode('gray.100', 'gray.700')(props),
      },
    },
  };
});

const variants = {
  circles: variantCircles,
  'circles-alt': variantCirclesAlt,
  simple: variantSimple,
};

export const StepsTheme: any = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    size: 'md',
    colorScheme: 'blue',
    variant: 'circles',
  },
});
