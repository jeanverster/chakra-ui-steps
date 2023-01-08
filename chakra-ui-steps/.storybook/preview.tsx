import {
  Button,
  ButtonGroup,
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { StoryContext } from '@storybook/react';
import React, { Dispatch, SetStateAction } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { withPerformance } from 'storybook-addon-performance';
import { StepsTheme } from '../src/theme';

enum Sizes {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

enum Orientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

enum Variants {
  circles = 'circles',
  circlesAlt = 'circles-alt',
  simple = 'simple',
}

type ConfigContextType = {
  size: Sizes;
  setSize: Dispatch<SetStateAction<Sizes>>;
  variant: Variants;
  setVariant: Dispatch<SetStateAction<Variants>>;
  orientation: Orientation;
  setOrientation: Dispatch<SetStateAction<Orientation>>;
};

const ConfigContext = React.createContext<Partial<ConfigContextType>>({
  size: Sizes.md,
  orientation: Orientation.horizontal,
  variant: Variants.circles,
});

export const useConfigContext = () => React.useContext(ConfigContext);

const ToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue('dark', 'light');
  const bg = useColorModeValue('gray.200', 'gray.700');
  const activeBg = useColorModeValue('teal.300', 'teal.600');
  const { size, setSize, variant, setVariant, setOrientation, orientation } =
    useConfigContext();

  return (
    <Flex justify="flex-end" mb={8} gap={4}>
      <ButtonGroup size="sm" isAttached>
        {Object.values(Orientation).map((val) => (
          <Button
            key={val}
            size="xs"
            onClick={() => setOrientation?.(val)}
            bg={val === orientation ? activeBg : bg}
          >
            {val}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup isAttached>
        {Object.values(Variants).map((val) => (
          <Button
            size="xs"
            key={val}
            onClick={() => setVariant?.(val)}
            bg={variant === val ? activeBg : bg}
          >
            {val}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup isAttached>
        {Object.values(Sizes).map((val) => (
          <Button
            size="xs"
            key={val}
            onClick={() => setSize?.(val)}
            bg={size === val ? activeBg : bg}
          >
            {val}
          </Button>
        ))}
      </ButtonGroup>
      <IconButton
        size="sm"
        fontSize="lg"
        marginLeft="2"
        variant="ghost"
        color="current"
        icon={<SwitchIcon />}
        onClick={toggleColorMode}
        aria-label={`Switch to ${nextMode} mode`}
      />
    </Flex>
  );
};

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = React.useState<Sizes>(Sizes.md);
  const [variant, setVariant] = React.useState<Variants>(Variants.circlesAlt);
  const [orientation, setOrientation] = React.useState<Orientation>(
    Orientation.horizontal
  );
  return (
    <ConfigContext.Provider
      value={{
        size,
        setSize,
        variant,
        setVariant,
        orientation,
        setOrientation,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const theme = context?.args?.theme
    ? context?.args.theme
    : extendTheme({ components: { Steps: StepsTheme } });
  return (
    <ChakraProvider theme={theme}>
      <ConfigProvider>
        <ToggleBar />
        <StoryFn />
      </ConfigProvider>
    </ChakraProvider>
  );
};

export const decorators = [withChakra, withPerformance];
