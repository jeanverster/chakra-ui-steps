import * as React from 'react';
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
}

const StepsContext = React.createContext<StepsContextValue>({
  activeStep: 0,
});

export const useStepsContext = () => React.useContext(StepsContext);

export const StepsProvider: React.FC<{ value: StepsContextValue }> = ({
  value,
  children,
}) => {
  const [widths, setWidths] = React.useState<number[]>([]);

  const isError = value.state === 'error';
  const isLoading = value.state === 'loading';

  const isVertical = value.orientation === 'vertical';
  const isLabelVertical = value.labelOrientation === 'vertical';

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
