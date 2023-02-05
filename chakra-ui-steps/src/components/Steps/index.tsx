import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useColorModeValue,
  useMediaQuery,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-context';
import { cx } from '@chakra-ui/shared-utils';
import * as React from 'react';
import { StepsProvider } from '../../context/index';

interface StepOptions {
  activeStep: number;
  orientation?: 'vertical' | 'horizontal';
  state?: 'loading' | 'error';
  responsive?: boolean;
  checkIcon?: React.ComponentType<any>;
  errorIcon?: React.ComponentType<any>;
  onClickStep?: (step: number) => void;
  trackColor?: string;
  mobileBreakpoint?: string;
  variant?: 'circles' | 'circles-alt' | 'simple';
}
export interface StepsProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange'>,
    Omit<ThemingProps<'Steps'>, 'variant'>,
    StepOptions {
  children?: React.ReactNode;
}

// const [StylesProvider, useStyles] = createStylesContext('Steps');
const [StylesProvider, useStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: 'StepsStyleContext',
  errorMessage: `useStepsStyles returned 'undefined'. Seems you forgot to wrap the components in "<Steps />" `,
});

export const useStepsStyles = useStyles;

export const Steps = forwardRef<StepsProps, 'div'>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      className,
      activeStep,
      children,
      orientation: orientationProp,
      state,
      responsive,
      checkIcon,
      errorIcon,
      onClickStep,
      mobileBreakpoint,
      trackColor: trackColorProp,
      ...rest
    } = omitThemingProps(props);

    console.log('responsive', responsive);

    const trackColor =
      trackColorProp || useColorModeValue('gray.200', 'gray.700');

    const childArr = React.Children.toArray(children);

    const stepCount = childArr.length;

    const renderHorizontalContent = () => {
      if (activeStep <= childArr.length) {
        return React.Children.map(childArr[activeStep], (node) => {
          if (!React.isValidElement(node)) return;
          return React.Children.map(
            node.props.children,
            (childNode) => childNode
          );
        });
      }
      return null;
    };

    const [isMobile] = useMediaQuery(
      `(max-width: ${mobileBreakpoint || '768px'})`
    );

    const clickable = !!onClickStep;

    const orientation = isMobile && responsive ? 'vertical' : orientationProp;

    const isVertical = orientation === 'vertical';

    const styles = useMultiStyleConfig('Steps', {
      ...props,
      orientation,
      stepCount,
      isVertical,
      trackColor,
    });

    const stepsStyles = {
      ...styles.root,
    };

    return (
      <StylesProvider value={styles}>
        <StepsProvider
          value={{
            activeStep,
            orientation,
            state,
            responsive,
            checkIcon,
            errorIcon,
            onClickStep,
            clickable,
            colorScheme: props.colorScheme,
            stepCount,
            trackColor,
            isVertical,
            variant: props.variant || 'circles',
          }}
        >
          <chakra.div
            ref={ref}
            __css={{
              justifyContent: stepCount === 1 ? 'flex-end' : 'space-between',
              flexDir: orientation === 'vertical' ? 'column' : 'row',
              ...stepsStyles,
            }}
            className={cx('cui-steps', className)}
            {...rest}
          >
            {React.Children.map(children, (child, i) => {
              const isCompletedStep =
                (React.isValidElement(child) && child.props.isCompletedStep) ??
                i < activeStep;
              const isLastStep = i === stepCount - 1;
              const isCurrentStep = i === activeStep;

              const stepProps = {
                index: i,
                isCompletedStep,
                isCurrentStep,
                isLastStep,
              };

              if (React.isValidElement(child)) {
                return React.cloneElement(child, stepProps);
              }

              return null;
            })}
          </chakra.div>
          {orientation === 'horizontal' && renderHorizontalContent()}
        </StepsProvider>
      </StylesProvider>
    );
  }
);

Steps.defaultProps = {
  activeStep: 0,
  colorScheme: 'green',
  orientation: 'horizontal',
  responsive: true,
};
