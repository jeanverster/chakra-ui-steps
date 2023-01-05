import * as React from "react";

type LazyCodeLoaderProps = {
  code: string;
};

const LazyCodeLoader = ({ code }: LazyCodeLoaderProps) => {
  const loader = React.useCallback(() => {
    const { default: Highlight, defaultProps } =
      require("prism-react-renderer") as typeof import("prism-react-renderer");
    const { default: dracula } =
      require("prism-react-renderer/themes/dracula") as typeof import("prism-react-renderer/themes/dracula");
    return (
      <Highlight {...defaultProps} theme={dracula} code={code} language="tsx">
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
  }, [code]);

  return loader();
};

export default LazyCodeLoader;
