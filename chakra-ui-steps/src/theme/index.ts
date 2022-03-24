import {
  anatomy,
  darken,
  lighten,
  mode,
  PartsStyleFunction,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

const parts = anatomy('steps').parts(
  'connector',
  'description',
  'icon',
  'iconLabel',
  'label',
  'labelContainer',
  'step',
  'stepContainer',
  'stepIconContainer',
  'steps'
);

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
  marginTop: '-2px',
  textAlign: 'center',
  fontSize: 'sm',
});

const baseStyleConnector: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const inactiveColor = mode('gray.200', 'gray.700')(props);
  const activeColor = mode(`${c}.500`, `${c}.200`)(props);

  return {
    flex: 1,
    display: 'flex',
    borderColor: inactiveColor,
    transitionProperty: 'border-color',
    transitionDuration: 'normal',
    _highlighted: {
      borderColor: activeColor,
    },
  };
};

const baseStyleStepIconContainer: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props;
  const inactiveColor = mode('gray.200', 'gray.700')(props);
  const activeColor = `${c}.500`;

  return {
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    bg: inactiveColor,
    borderColor: inactiveColor,
    transitionProperty: 'background, border-color',
    transitionDuration: 'normal',
    _activeStep: {
      bg: mode(darken(inactiveColor, 0.5), lighten(inactiveColor, 0.5))(props),
      borderColor: activeColor,
      _invalid: {
        bg: 'red.500',
        borderColor: 'red.500',
      },
    },
    _highlighted: {
      bg: activeColor,
      borderColor: activeColor,
    },
    '&[data-clickable]:hover': {
      borderColor: activeColor,
    },
  };
};

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  connector: baseStyleConnector(props),
  description: baseStyleDescription(props),
  icon: baseStyleIcon,
  iconLabel: baseStyleLabel(props),
  label: baseStyleLabel(props),
  labelContainer: {
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
  },
  step: {
    display: 'flex',
    position: 'relative',
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  stepIconContainer: baseStyleStepIconContainer(props),
  steps: {
    fontFamily: 'heading',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flex: 1,
  },
});

const sizes = {
  sm: {
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
  },
  md: {
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
  },
  lg: {
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
  },
};

const defaultProps = {
  size: 'md',
  colorScheme: 'green',
};

export const StepsStyleConfig = {
  parts: parts.keys,
  baseStyle,
  sizes,
  defaultProps,
};
