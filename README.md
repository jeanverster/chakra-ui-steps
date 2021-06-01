# chakra-ui-steps

<p>
  Steps component designed to work seamlessly with Chakra UI
</p>
<p>
An interactive demo can be viewed <a href="https://www.flaticon.com/authors/ultimatearm" title="ultimatearm">here</a>.
</p>

## Features

- Multiple orientations
- Supports child components
- Custom icons
- Size variants

## Installation

`$ yarn add chakra-ui-steps`

## Usage

> NOTE: This component requires Chakra UI > v1.0 to work correctly. You can follow the installation instructions <a href="https://chakra-ui.com/docs/getting-started" target="_blank">here</a>.

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

### `Steps`

> Note: Both the `Step` and `Steps` component extend the Chakra UI `Box` component so they accept all the default styling props.

| Prop              | Type    | Required | Description                                                                | Default    |
| ----------------- | ------- | -------- | -------------------------------------------------------------------------- | ---------- |
| **`activeStep`**  | number  | yes      | Currently active step                                                      | 0          |
| **`colorScheme`** | string  | no       | Sets the color accent of the Steps component show                          | green      |
| **`orientation`** | string  | no       | Sets the orientation of the Steps component                                | horizontal |
| **`responsive`**  | boolean | no       | Sets whether the component auto switches to vertical orientation on mobile | true       |

### `Step`

| Prop              | Type                | Required | Description                                                          | Default   |
| ----------------- | ------------------- | -------- | -------------------------------------------------------------------- | --------- |
| **`label`**       | string              | no       | Sets the title of the step                                           | ''        |
| **`description`** | string              | no       | Provides extra info about the step                                   | ''        |
| **`icon`**        | React.ComponentType | no       | Custom icon to overwrite the default numerical indicator of the step | undefined |
