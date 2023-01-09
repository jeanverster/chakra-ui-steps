import {
  Box,
  Button,
  extendTheme,
  Flex,
  FlexProps,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';
import { motion, MotionProps } from 'framer-motion';
import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import {
  FiCheckCircle,
  FiClipboard,
  FiDollarSign,
  FiUser,
} from 'react-icons/fi';
import { useConfigContext } from '../.storybook/preview';
import { Step, Steps, StepsTheme, useSteps } from '../src';

const meta: Meta = {
  title: 'Steps',
};

export default meta;

type ResetPromptProps = Omit<FlexProps, keyof MotionProps> & {
  onReset: () => void;
};

const MotionFlex = motion<FlexProps>(Flex);

const ResetPrompt = ({ onReset, ...rest }: ResetPromptProps): JSX.Element => {
  return (
    <MotionFlex
      px={4}
      py={4}
      width="100%"
      align="center"
      justify="center"
      flexDirection="column"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
      <Button mt={6} size="sm" onClick={onReset}>
        Reset
      </Button>
    </MotionFlex>
  );
};

type StepButtonsProps = {
  nextStep?: () => void;
  prevStep?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  isLast?: boolean;
};

const StepButtons = ({
  nextStep,
  prevStep,
  prevDisabled,
  nextDisabled,
  isLast,
}: StepButtonsProps): JSX.Element => {
  return (
    <Flex width="100%" justify="flex-end">
      <Button
        mr={4}
        variant="ghost"
        size="sm"
        onClick={prevStep}
        isDisabled={prevDisabled}
      >
        Prev
      </Button>
      <Button isDisabled={nextDisabled} size="sm" onClick={nextStep}>
        {isLast ? 'Finish' : 'Next'}
      </Button>
    </Flex>
  );
};

type ContentProps = FlexProps & {
  index: number;
};

const Content = ({ index, ...rest }: ContentProps) => {
  const bg = useColorModeValue('gray.200', 'gray.700');
  return (
    <Flex
      p={6}
      bg={bg}
      rounded="md"
      width="100%"
      align="center"
      justify="center"
      {...rest}
    >
      <Text>Step {index + 1}</Text>
    </Flex>
  );
};

const steps = [{ label: 'Login' }, { label: 'Verification' }, { label: 'Pay' }];
const descriptionSteps = [
  { label: 'Login', description: 'Step 1 Description' },
  { label: 'Verification', description: 'Step 2 Description' },
  { label: 'Pay', description: 'Step 3 Description' },
];

//👇 We create a “template” of how args map to rendering
// const Template: Story<any> = (args) => <Button {...args} />

export const Horizontal = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps {...config} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const NoLabels = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps {...config} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step key={label}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const Vertical = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps {...config} orientation="vertical" activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const WithDescription = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps {...config} activeStep={activeStep}>
        {descriptionSteps.map(({ label, description }, index) => (
          <Step label={label} key={label} description={description}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

type StateValue = 'loading' | 'error' | undefined;

export const WithStates = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [stepState, setStepState] = React.useState<StateValue>('loading');

  const config = useConfigContext();

  return (
    <>
      <VStack width="100%" mb={8} align="flex-start">
        <RadioGroup
          defaultValue="loading"
          onChange={(val) => setStepState(val as StateValue)}
        >
          <HStack direction="row">
            <Radio value="loading">Loading</Radio>
            <Radio value="error">Error</Radio>
          </HStack>
        </RadioGroup>
      </VStack>
      <Steps {...config} state={stepState} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

const statesSteps: StateValue[] = ['loading', 'error', undefined];

export const WithPerStepState = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const config = useConfigContext();

  return (
    <>
      <Steps {...config} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label} state={statesSteps[index]}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const WithKeepErrorState = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const config = useConfigContext();

  return (
    <>
      <Steps {...config} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label} state="error" isKeepError>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

const iconSteps = [
  { label: 'Login', icon: FiUser },
  { label: 'Verification', icon: FiClipboard },
  { label: 'Pay', icon: FiDollarSign },
];

export const CustomStepIcons = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const config = useConfigContext();

  return (
    <>
      <Steps {...config} activeStep={activeStep}>
        {iconSteps.map(({ label, icon }, index) => (
          <Step label={label} key={label} icon={icon}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const CustomCheckIcon = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps {...config} checkIcon={FiCheckCircle} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const CustomPerStepCheckIcon = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps {...config} checkIcon={FiCheckCircle} activeStep={activeStep}>
        {iconSteps.map(({ label, icon }, index) => (
          <Step label={label} key={label} checkIcon={icon}>
            <Content my={6} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const CustomStyles: Story<{ theme: any }> = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps
        {...config}
        checkIcon={AiFillCheckCircle}
        colorScheme="blue"
        activeStep={activeStep}
      >
        {iconSteps.map(({ label, icon }, index) => (
          <Step label={label} key={label} icon={icon}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

const CustomSteps = {
  ...StepsTheme,
  baseStyle: (props: any) => {
    const activeColor = `blue.500`;
    return {
      ...StepsTheme.baseStyle(props),
      stepContainer: {
        ...StepsTheme.baseStyle(props).stepContainer,
        borderRadius: 0,
        _activeStep: {
          bg: activeColor,
          borderColor: activeColor,
        },
        _highlighted: {
          bg: activeColor,
          borderColor: activeColor,
        },
        '&[data-clickable]:hover': {
          borderColor: activeColor,
        },
      },
    };
  },
};

const theme = extendTheme({
  components: {
    Steps: CustomSteps,
  },
});

CustomStyles.args = {
  theme,
};

export const ClickableSteps: Story = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep, setStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <>
      <Steps
        {...config}
        checkIcon={FiCheckCircle}
        activeStep={activeStep}
        onClickStep={(step) => setStep(step)}
      >
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </>
  );
};

export const RTL = (): JSX.Element => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const config = useConfigContext();
  return (
    <Box
      sx={{
        direction: 'rtl',
      }}
    >
      <Steps {...config} checkIcon={FiCheckCircle} activeStep={activeStep}>
        {steps.map(({ label }, index) => (
          <Step label={label} key={label}>
            <Content my={3} index={index} />
          </Step>
        ))}
      </Steps>
      {activeStep === 3 ? (
        <ResetPrompt onReset={reset} />
      ) : (
        <StepButtons
          {...{ nextStep, prevStep }}
          prevDisabled={activeStep === 0}
        />
      )}
    </Box>
  );
};
