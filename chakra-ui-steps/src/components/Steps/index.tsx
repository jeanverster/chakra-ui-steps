import {
  chakra,
  createStylesContext,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useBreakpointValue,
  useColorModeValue,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import * as React from 'react';
import { StepsProvider } from '../../context/index';
export interface StepsProps extends HTMLChakraProps<'div'>, ThemingProps {
  activeStep: number;
  orientation?: 'vertical' | 'horizontal';
  state?: 'loading' | 'error';
  responsive?: boolean;
  checkIcon?: React.ComponentType<any>;
  onClickStep?: (step: number) => void;
  labelOrientation?: 'vertical' | 'horizontal';
  trackColor?: string;
  isMobileBreakpointValue?: Partial<Record<string, boolean>> | boolean[];
}

const [StylesProvider, useStyles] = createStylesContext('Steps');

export const useStepsStyles = useStyles;

export const Steps = forwardRef<StepsProps, 'div'>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const styles = useMultiStyleConfig('Steps', props);

    const stepsStyles = {
      ...styles.steps,
    };

    const {
      className,
      activeStep,
      children,
      orientation: orientationProp,
      state,
      responsive,
      checkIcon,
      onClickStep,
      labelOrientation,
      isMobileBreakpointValue,
      trackColor: trackColorProp,
      ...rest
    } = omitThemingProps(props);

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

    const clickable = !!onClickStep;

    const isMobile = useBreakpointValue(
      isMobileBreakpointValue || {
        base: true,
        xs: true,
        sm: false,
        md: false,
        lg: false,
      },
      {
        fallback: 'base',
      }
    );

    const orientation = isMobile && responsive ? 'vertical' : orientationProp;

    return (
      <StylesProvider value={styles}>
        <StepsProvider
          value={{
            activeStep,
            orientation,
            state,
            responsive,
            checkIcon,
            onClickStep,
            labelOrientation,
            clickable,
            colorScheme: props.colorScheme,
            stepCount,
            trackColor,
          }}
        >
          <chakra.div
            ref={ref}
            __css={{
              justifyContent: stepCount === 1 ? 'flex-end' : 'space-between',
              flexDir: orientation === 'vertical' ? 'column' : 'row',
              ...stepsStyles,
            }}
            className="cui-steps"
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
