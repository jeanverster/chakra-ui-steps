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

type ConfigContextType = {
  size: Sizes;
  setSize: Dispatch<SetStateAction<Sizes>>;
};

const ConfigContext = React.createContext<Partial<ConfigContextType>>({
  size: Sizes.md,
});

export const useConfigContext = () => React.useContext(ConfigContext);

const ToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue('dark', 'light');
  const bg = useColorModeValue('gray.200', 'gray.700');
  const activeBg = useColorModeValue('teal.300', 'teal.600');
  const { size, setSize } = useConfigContext();

  return (
    <Flex justify="flex-end" mb={4}>
      <ButtonGroup mr={4} isAttached>
        {Object.values(Sizes).map((val) => (
          <Button
            size="sm"
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
  return (
    <ConfigContext.Provider value={{ size, setSize }}>
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
