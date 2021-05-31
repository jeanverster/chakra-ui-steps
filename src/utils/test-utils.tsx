import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@testing-library/jest-dom/extend-expect';
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { RunOptions } from 'axe-core';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { StepsStyleConfig } from '../theme';

expect.extend(toHaveNoViolations);

type UI = Parameters<typeof rtlRender>[0];

// UI-less passthrough fallback to prevent using conditional logic in render
function ChildrenPassthrough({ children }: { children: React.ReactElement }) {
  return children;
}

/**
 * Custom render for @testing-library/react
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 * @param component the component under test
 * @param options customized test options
 */
export const render = (
  ui: UI,
  { wrapper: Wrapper = ChildrenPassthrough, ...options }: TestOptions = {}
): RenderResult => {
  const theme = extendTheme({
    components: {
      Steps: StepsStyleConfig,
    },
  });

  return rtlRender(
    <ChakraProvider theme={theme}>
      <Wrapper>{ui}</Wrapper>
    </ChakraProvider>,
    options
  );
};

export { rtlRender };
export { axe };

export interface TestOptions extends Omit<RenderOptions, 'wrapper'> {
  /**
   * optional additional wrapper, e.g. Context
   *
   * @example
   * ```ts
   * // single wrapper
   * render(<MyConponent />, {
   *  wrapper: MyContext
   * });
   *
   * // multiple wrapper
   * render(<MyConponent />, {
   *  wrapper: ({ children }) => (
   *    <ContextA>
   *      <ContextB>
   *        {children}
   *      <ContextB />
   *    <ContextA />
   *  )
   * });
   *
   * ```
   */
  wrapper?: typeof ChildrenPassthrough;
}
type TestA11YOptions = TestOptions & { axeOptions?: RunOptions };
/**
 * Validates against common a11y mistakes.
 *
 * Wrapper for jest-axe
 *
 * @example
 * ```jsx
 * it('passes a11y test', async () => {
 *  await testA11Y(<MyComponent />, options);
 * });
 *
 * // sometimes we need to perform interactions first to render conditional UI
 * it('passes a11y test when open', async () => {
 *  const { container } = render(<MyComponent />, options);
 *
 *  fireEvent.click(screen.getByRole('button'));
 *
 *  await testA11Y(container, options);
 * });
 * ```
 *
 * @see https://github.com/nickcolley/jest-axe#testing-react-with-react-testing-library
 */
export const testA11y = async (
  ui: UI | Element,
  { axeOptions, ...options }: TestA11YOptions = {}
) => {
  const container = React.isValidElement(ui)
    ? render(ui, options).container
    : ui;

  const results = await axe(container, axeOptions);

  expect(results).toHaveNoViolations();
};
