import { beforeAll, vi } from 'vitest';

beforeAll(() => {
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
});
