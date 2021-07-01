<h1 align="center" style="font-weight: bold;">
  <br>
  <a href="https://jeanverster.github.io/chakra-ui-steps-site/"><div style="display: block;width: 60px;height:60px; margin: 0 auto; margin-bottom: 1rem;" align="center"><svg viewBox="0 0 257 257" xmlns="http://www.w3.org/2000/svg" class="css-89iovl"><rect width="257" height="257" rx="128.5" fill="url(#mark)"></rect><path d="M69.558 133.985l87.592-86.9891c1.636-1.6251 4.27.3525 3.165 2.377l-32.601 59.7521c-.728 1.332.237 2.958 1.755 2.958h56.34c1.815 0 2.691 2.223 1.364 3.462l-98.7278 92.142c-1.7702 1.652-4.4051-.676-2.9839-2.636l46.7357-64.473c.958-1.322.014-3.174-1.619-3.174H70.9673c-1.7851 0-2.6759-2.161-1.4093-3.419z" fill="#fff"></path><defs><linearGradient id="mark" x1="128.5" x2="128.5" y2="257" gradientUnits="userSpaceOnUse"><stop stop-color="#7BCBD4"></stop><stop offset="1" stop-color="#29C6B7"></stop></linearGradient></defs></svg></div></a>
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
