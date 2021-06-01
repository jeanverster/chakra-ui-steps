import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Step, Steps } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: Steps,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<any> = args => (
  <Steps {...args}>
    <Step label="Step 1 Label" />
    <Step label="Step 2 Label" />
    <Step label="Step 3 Label" />
  </Steps>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  activeStep: 0,
};
