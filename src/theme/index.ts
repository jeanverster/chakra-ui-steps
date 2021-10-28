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

const baseStyleSteps: SystemStyleObject = {
  fontFamily: 'heading',
  textAlign: 'center',
  width: '100%',
  display: 'flex',
  flex: 1,
};

const baseStyleStep: SystemStyleObject = {
  display: 'flex',
  position: 'relative',
  justifyContent: 'flex-start',
};

const baseStylestepIconContainer: SystemStyleObject = {
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
};

const baseStyleIcon: SystemStyleObject = {
  strokeWidth: '2px',
};

const baseStyleConnector: SystemStyleObject = {
  flex: 1,
  display: 'flex',
};

const baseStyleLabel: SystemStyleFunction = props => {
  return {
    fontWeight: 'medium',
    color: mode(`gray.900`, `gray.100`)(props),
    textAlign: 'center',
    fontSize: 'md',
  };
};

const baseStyleDescription: SystemStyleFunction = props => {
  return {
    marginTop: '-2px',
    color: mode(`gray.800`, `gray.200`)(props),
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 'sm',
  };
};

const baseStyle: PartsStyleFunction<typeof parts> = props => {
  return {
    connector: baseStyleConnector,
    description: baseStyleDescription(props),
    icon: baseStyleIcon,
    label: baseStyleLabel(props),
    labelContainer: {},
    step: baseStyleStep,
    stepContainer: {},
    stepIconContainer: baseStylestepIconContainer,
    steps: baseStyleSteps,
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
