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

export interface StepsProps extends HTMLChakraProps<'div'>, ThemingProps {
  activeStep: number;
  orientation?: 'vertical' | 'horizontal';
  state?: 'loading' | 'error';
  responsive?: boolean;
  checkIcon?: React.ComponentType<any>;
  onClickStep?: (step: number) => void;
}

export const Steps = forwardRef<StepsProps, 'div'>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const styles = useMultiStyleConfig('Steps', props);

    const stepsStyles = {
      fontFamily: 'heading',
      textAlign: 'center',
      width: '100%',
      display: 'flex',
      flex: 1,
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
        <chakra.div
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
              colorScheme: props.colorScheme,
              isCompletedStep,
              isCurrentStep,
              isLastStep,
              orientation,
              state,
              checkIcon,
              clickable,
              onClickStep,
            };

            return React.isValidElement(child)
              ? React.cloneElement(child, stepProps)
              : null;
          })}
        </chakra.div>
        {orientation === 'horizontal' && renderHorizontalContent()}
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
