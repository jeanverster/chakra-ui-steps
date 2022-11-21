import React from 'react';
import { StepsProps } from '../components/Steps';

interface StepsContextValue extends StepsProps {
  stepContainerWidths?: number[];
  clickable?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isVertical?: boolean;
  isLabelVertical?: boolean;
  widths?: number[];
  setWidths?: React.Dispatch<React.SetStateAction<number[]>>;
  stepCount?: number;
}

const StepsContext = React.createContext<StepsContextValue>({
  activeStep: 0,
});

export const useStepsContext = () => React.useContext(StepsContext);

export const StepsProvider: React.FC<React.PropsWithChildren<{ value: StepsContextValue }>> = ({
  value,
  children,
}) => {
  const [widths, setWidths] = React.useState<number[]>([]);

  const isError = value.state === 'error';
  const isLoading = value.state === 'loading';

  const isVertical = value.orientation === 'vertical';
  const isLabelVertical =
    value.orientation !== 'vertical' && value.labelOrientation === 'vertical';

  return (
    <StepsContext.Provider
      value={{
        ...value,
        widths,
        setWidths,
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
