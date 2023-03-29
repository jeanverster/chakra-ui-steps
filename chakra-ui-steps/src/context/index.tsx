import * as React from 'react';
import { StepsProps } from '../components/Steps';

export interface StepsContextValue extends StepsProps {
  clickable?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isVertical?: boolean;
  stepCount?: number;
  trackColor?: string;
  expandVerticalSteps?: boolean;
}

const StepsContext = React.createContext<StepsContextValue>({
  activeStep: 0,
});

export const useStepsContext = () => React.useContext(StepsContext);

type StepsContextProviderProps = {
  value: StepsContextValue;
  children: React.ReactNode;
};

export const StepsProvider = ({
  value,
  children,
}: StepsContextProviderProps) => {
  const isError = value.state === 'error';
  const isLoading = value.state === 'loading';

  return (
    <StepsContext.Provider
      value={{
        ...value,
        isError,
        isLoading,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};
