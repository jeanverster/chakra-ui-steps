import {
  anatomy,
  mode,
  PartsStyleFunction,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools';

// { step, stepContainer, stepIconContainer, label, labelContainer, description, icon }

const parts = anatomy('steps').parts(
  'connector',
  'description',
  'icon',
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

const baseStyleLabel: SystemStyleFunction = props => {
  return {
    color: mode(`gray.900`, `gray.100`)(props),
  };
};

const baseStyleDescription: SystemStyleFunction = props => {
  return {
    color: mode(`gray.800`, `gray.200`)(props),
  };
};

const baseStyle: PartsStyleFunction<typeof parts> = props => {
  return {
    connector: {},
    description: baseStyleDescription(props),
    icon: baseStyleIcon,
    label: baseStyleLabel(props),
    labelContainer: {},
    step: {},
    stepContainer: {},
    stepIconContainer: {},
    steps: {},
  };
};

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
