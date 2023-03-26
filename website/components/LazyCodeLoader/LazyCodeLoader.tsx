import Highlight, { Language } from "prism-react-renderer";
import * as React from "react";

type LazyCodeLoaderProps = Partial<
  Omit<
    React.ComponentProps<typeof Highlight>,
    "Prism" | "language" | "children"
  >
> & {
  language?: Language;
};

const LazyCodeLoader = ({ code, language, ...rest }: LazyCodeLoaderProps) => {
  const loader = React.useCallback(() => {
    const { default: Highlight, defaultProps } =
      require("prism-react-renderer") as typeof import("prism-react-renderer");
    const { default: dracula } =
      require("prism-react-renderer/themes/dracula") as typeof import("prism-react-renderer/themes/dracula");
    return (
      <Highlight
        language={language || "tsx"}
        code={code || ""}
        {...defaultProps}
        {...rest}
        theme={dracula}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: "1rem" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }, [code, rest, language]);

  return loader();
};

export default LazyCodeLoader;
