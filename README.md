<h1 align="center" style="font-weight: bold;">
  <br>
  <a href="https://jeanverster.github.io/chakra-ui-steps-site/"><img src="https://i.imgur.com/xhPNj6b.png" alt="Markdownify" width="50" style="border-radius:50%"></a>
  <br>
  Chakra UI Steps
  <br>
</h1>

<h4 align="center">Steps component designed to work seamlessly with <a href="https://chakra-ui.com/" target="_blank">Chakra UI</a>.</h4>

<h4 align="center">An interactive demo can be viewed <a href="https://jeanverster.github.io/chakra-ui-steps-site/" target="_blank">here</a>.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/chakra-ui-steps">
    <img src="https://badge.fury.io/js/chakra-ui-steps.svg"
         alt="Gitter">
  </a>
  <a href="https://saythanks.io/to/jeanverster0107@gmail.com">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
</p>

![screenshot](https://i.imgur.com/XeOZxIF.gif)

## Features

- Multiple orientations
- Easily render step content
- Custom icons
- Size variants

## Installation

Yarn:

```bash
yarn add chakra-ui-steps
```

NPM:

```bash
npm i chakra-ui-steps
```

## Usage

> NOTE: This component requires Chakra UI > v1.0 to work correctly. You can follow the installation instructions <a href="https://chakra-ui.com/docs/getting-started" target="_blank">here</a>.

In order to get started you will need to extend the default Chakra theme with the provided `StepsStyleConfig` object, like so:

```jsx
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  components: {
    Steps,
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
};
```

Once that's done you should be good to go!

### Basic Example:

```jsx
import { Step, Steps, useSteps } from 'chakra-ui-steps';

const content = (
  <Flex py={4}>
    <LoremIpsum p={1} />
  </Flex>
);

const steps = [
  { label: 'Step 1', content },
  { label: 'Step 2', content },
  { label: 'Step 3', content },
];

export const BasicExample = () => {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Steps activeStep={activeStep}>
      {steps.map(({ label, content }) => (
        <Step label={label} key={label}>
          {content}
        </Step>
      ))}
    </Steps>
  );
};
```

## Props

> Note: Both the `Step` and `Steps` component extend the Chakra UI `Box` component so they accept all the default styling props.

### `Steps`

| Prop              | Type    | Required | Description                                                                | Default    |
| ----------------- | ------- | -------- | -------------------------------------------------------------------------- | ---------- |
| **`activeStep`**  | number  | yes      | Currently active step                                                      | 0          |
| **`colorScheme`** | string  | no       | Sets the color accent of the Steps component show                          | green      |
| **`orientation`** | string  | no       | Sets the orientation of the Steps component                                | horizontal |
| **`responsive`**  | boolean | no       | Sets whether the component auto switches to vertical orientation on mobile | true       |

### `Step`

| Prop                  | Type                | Required | Description                                                          | Default   |
| --------------------- | ------------------- | -------- | -------------------------------------------------------------------- | --------- |
| **`label`**           | string              | no       | Sets the title of the step                                           | ''        |
| **`description`**     | string              | no       | Provides extra info about the step                                   | ''        |
| **`icon`**            | React.ComponentType | no       | Custom icon to overwrite the default numerical indicator of the step | undefined |
| **`isCompletedStep`** | boolean             | no       | Individually control each step state, defaults to active step        | undefined |
