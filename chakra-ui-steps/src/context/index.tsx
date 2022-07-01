import * as React from 'react';
import { StepsProps } from '../components/Steps';

export interface StepsContextValue extends StepsProps {
  clickable?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isVertical?: boolean;
  isLabelVertical?: boolean;
  stepCount?: number;
  trackColor?: string;
}

const StepsContext = React.createContext<StepsContextValue>({
  activeStep: 0,
});

export const useStepsContext = () => React.useContext(StepsContext);

export const StepsProvider: React.FC<{ value: StepsContextValue }> = ({
  value,
  children,
}) => {
  const isError = value.state === 'error';
  const isLoading = value.state === 'loading';

  const isVertical = value.orientation === 'vertical';
  const isLabelVertical =
    value.orientation !== 'vertical' && value.labelOrientation === 'vertical';

  return (
    <StepsContext.Provider
      value={{
        ...value,
        isError,
        isLoading,
        isVertical,
        isLabelVertical,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
