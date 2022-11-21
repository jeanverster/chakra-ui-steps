import { createStylesContext, useMediaQuery } from '@chakra-ui/react';
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
} from '@chakra-ui/system';
import { useMultiStyleConfig } from "@chakra-ui/react";
import { cx } from '@chakra-ui/utils';
import React, { ComponentType, Ref, Children, isValidElement, cloneElement } from 'react';
import { StepsProvider } from '../../context/index';

export interface StepsProps extends HTMLChakraProps<'ol'>, ThemingProps {
  activeStep: number;
  orientation?: 'vertical' | 'horizontal';
  state?: 'loading' | 'error';
  responsive?: boolean;
  checkIcon?: ComponentType<any>;
  onClickStep?: (step: number) => void;
  labelOrientation?: 'vertical' | 'horizontal';
}

export const Steps = forwardRef<StepsProps, 'div'>(
  (props, ref: Ref<HTMLOListElement>) => {
    const [StylesProvider] = createStylesContext("Steps");

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
    } =  omitThemingProps(props);

    const styles = useMultiStyleConfig('Steps', rest);

    const stepsStyles = {
      ...styles.steps,
    };

    const childArr = Children.toArray(children);

    const stepCount = childArr.length;

    const renderHorizontalContent = () => {
      if (activeStep <= childArr.length) {
        return Children.map(childArr[activeStep], node => {
          if (!isValidElement(node)) return;
          return Children.map(
            node.props.children,
            childNode => childNode
          );
        });
      }
      return null;
    };

    const clickable = !!onClickStep;

    const [isMobile] = useMediaQuery('(max-width: 43em)', { fallback: false });

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
              flexDirection: orientation === 'vertical' ? 'column' : 'row',
              ...stepsStyles,
            }}
            className={cx('chakra-steps', className)}
            {...rest}
          >
            {Children.map(children, (child, i) => {
              const isCompletedStep =
                (isValidElement(child) && (child.props as any).isCompletedStep ) ??
                i < activeStep;
              const isLastStep = i === stepCount - 1;
              const isCurrentStep = i === activeStep;

              const stepProps = {
                index: i,
                isCompletedStep,
                isCurrentStep,
                isLastStep,
              };

              if (isValidElement(child)) {
                return cloneElement(child, stepProps);
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
