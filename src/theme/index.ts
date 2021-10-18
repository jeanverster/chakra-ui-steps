import { mode } from '@chakra-ui/theme-tools';

const parts = [
  'steps',
  'step',
  'stepContainer',
  'stepIconCont',
  'icon',
  'connector',
  'label',
  'labelContainer',
  'description',
];

type Dict = Record<string, any>;

const baseStyle = (props: Dict) => {
  return {
    steps: {
      fontFamily: 'heading',
      textAlign: 'center',
      width: '100%',
      display: 'flex',
      flex: 1,
    },
    step: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    stepIconCont: {
      display: 'flex',
      borderRadius: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      strokeWidth: '2px',
    },
    connector: {
      flex: 1,
      display: 'flex',
    },
    label: {
      fontWeight: 'medium',
      color: mode(`gray.900`, `gray.100`)(props),
      textAlign: 'center',
      fontSize: 'md',
    },
    description: {
      marginTop: '-2px',
      color: mode(`gray.800`, `gray.200`)(props),
      textAlign: 'center',
      opacity: 0.9,
      fontSize: 'sm',
    },
  };
};

const sizes = {
  sm: {
    stepIconCont: {
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
    stepIconCont: {
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
    stepIconCont: {
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
  parts,
  baseStyle,
  sizes,
  defaultProps,
};
