import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import * as React from 'react';
import { StepsStyleConfig } from '../theme';

/**
 * @vitest-environment jsdom
 */

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
