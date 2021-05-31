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
}

export const Steps = forwardRef<StepsProps, 'div'>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const styles = useMultiStyleConfig('Steps', props);

    const {
      className,
      activeStep,
      children,
      orientation: orientationProp,
      state,
      responsive,
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

    const [isMobile] = useMediaQuery('(max-width: 43em)');

    const orientation = isMobile && responsive ? 'vertical' : orientationProp;

    return (
      <StylesProvider value={styles}>
        <chakra.div
          ref={ref}
          __css={{
            justifyContent: stepCount === 1 ? 'flex-end' : 'space-between',
            flexDir: orientation === 'vertical' ? 'column' : 'row',
            ...styles.steps,
          }}
          {...rest}
          className={cx('chakra-steps', className)}
        >
          {React.Children.map(children, (child, i) => {
            const isCompletedStep = i < activeStep;
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
