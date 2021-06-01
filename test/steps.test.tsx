import { Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Step, Steps } from '../src';
import { render, testA11y } from '../src/utils/test-utils';

describe('<Steps />', () => {
  it('should pass a11y test', async () => {
    const wizard = (
      <Steps py={6} colorScheme="green" activeStep={0}>
        <Step label="Step 1" />
        <Step label="Step 2" />
        <Step label="Step 3" />
      </Steps>
    );
    await testA11y(wizard);
  });

  it('should render labels if present', async () => {
    const { getByText } = render(
      <Steps colorScheme="green" activeStep={0}>
        <Step label="Step 1" />
        <Step label="Step 2" />
        <Step label="Step 3" />
      </Steps>
    );
    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('Step 2')).toBeTruthy();
    expect(getByText('Step 3')).toBeTruthy();
  });

  it('should render children', async () => {
    const { queryByTestId } = render(
      <Steps colorScheme="green" orientation="vertical" activeStep={0}>
        <Step label="Step 1">
          <Flex data-testid="child-1">
            <span>Child 1</span>
          </Flex>
        </Step>
      </Steps>
    );

    const child = queryByTestId('child-1');

    expect(child).toBeTruthy();
  });
});
