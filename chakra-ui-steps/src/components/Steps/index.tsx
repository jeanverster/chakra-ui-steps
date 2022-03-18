import { useMediaQuery } from '@chakra-ui/react';
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/system';
import { cx } from '@chakra-ui/utils';
import * as React from 'react';
import { StepsProvider } from '../../context/index';

export interface StepsProps extends HTMLChakraProps<'ol'>, ThemingProps {
  activeStep: number;
  orientation?: 'vertical' | 'horizontal';
  state?: 'loading' | 'error';
  responsive?: boolean;
  checkIcon?: React.ComponentType<any>;
  onClickStep?: (step: number) => void;
  labelOrientation?: 'vertical' | 'horizontal';
}

export const Steps = forwardRef<StepsProps, 'div'>(
  (props, ref: React.Ref<HTMLOListElement>) => {
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
      ...rest
    } = omitThemingProps(props);

    const childArr = React.Children.toArray(children);

    const stepCount = childArr.length;

    const renderHorizontalContent = () => {
      if (activeStep <= childArr.length) {
        return React.Children.map(childArr[activeStep], node => {
          if (!React.isValidElement(node)) return;
          return React.Children.map(
            node.props.children,
            childNode => childNode
          );
        });
      }
      return null;
    };

    const clickable = !!onClickStep;

    const [isMobile] = useMediaQuery('(max-width: 43em)');

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
          }}
        >
          <chakra.ol
            ref={ref}
            __css={{
              justifyContent: stepCount === 1 ? 'flex-end' : 'space-between',
              flexDir: orientation === 'vertical' ? 'column' : 'row',
              ...stepsStyles,
            }}
            className={cx('chakra-steps', className)}
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
          </chakra.ol>
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
