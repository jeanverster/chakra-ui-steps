import React from 'react';
import { Flex } from '@chakra-ui/react';
import { describe, expect, it } from 'vitest';
import { Step, Steps } from '../src';
import { render } from '../src/utils/test-utils';

/**
 * @vitest-environment jsdom
 */

describe('<Steps />', () => {
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
      <Steps colorScheme="green" activeStep={0}>
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

  it('should be able to control isCompletedStep for each step', async () => {
    const { container } = render(
      <Steps colorScheme="green" activeStep={1}>
        <Step isCompletedStep={false} label="Step 1">
          <Flex data-testid="child-1">
            <span>Child 1</span>
          </Flex>
        </Step>
        <Step isCompletedStep={true} label="Step 2">
          <Flex data-testid="child-2">
            <span>Child 2</span>
          </Flex>
        </Step>
      </Steps>
    );
    expect(container.querySelectorAll('svg').length).toBe(1);
  });
});
