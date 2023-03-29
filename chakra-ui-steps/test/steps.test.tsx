import { Flex } from '@chakra-ui/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Step, Steps } from '../src';
import { render } from '../src/utils/test-utils';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('@chakra-ui/react', async () => {
  const mod = await vi.importActual('@chakra-ui/react');
  return {
    ...(mod as Record<string, unknown>),
    useBreakpointValue: vi.fn().mockImplementation(() => 'sm'),
  };
});

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

  it('should be able to control isCompletedStep for each step', async () => {
    const { container } = render(
      <Steps
        colorScheme="green"
        orientation="vertical"
        variant="circles"
        activeStep={1}
      >
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

  it('should render custom check icon', async () => {
    const CheckIcon = () => <span>Custom Check Icon</span>;

    const { getByText } = render(
      <Steps colorScheme="green" variant="circles" activeStep={0}>
        <Step isCompletedStep={true} label="Step 1" checkIcon={CheckIcon}>
          <Flex data-testid="child-1">
            <span>Child 1</span>
          </Flex>
        </Step>
      </Steps>
    );
    expect(getByText('Custom Check Icon')).toBeTruthy();
  });

  it('should render custom icon for each step', async () => {
    const CustomIconOne = () => <span>CiOne</span>;
    const CustomIconTwo = () => <span>CiTwo</span>;
    const CustomIconThree = () => <span>CiThree</span>;

    const { getByText } = render(
      <Steps
        colorScheme="green"
        orientation="vertical"
        variant="circles"
        activeStep={0}
      >
        <Step label="Uno" icon={CustomIconOne}>
          <Flex data-testid="child-1">Child 1</Flex>
        </Step>
        <Step label="Dos" icon={CustomIconTwo}>
          <Flex data-testid="child-2">Child 2</Flex>
        </Step>
        <Step label="Tres" icon={CustomIconThree}>
          <Flex data-testid="child-3">Child 3</Flex>
        </Step>
      </Steps>
    );

    expect(getByText('CiOne')).toBeTruthy();
    expect(getByText('CiTwo')).toBeTruthy();
    expect(getByText('CiThree')).toBeTruthy();
  });
});
