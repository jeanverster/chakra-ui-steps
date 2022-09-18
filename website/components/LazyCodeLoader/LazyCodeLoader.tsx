import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";
import * as React from "react";

type LazyCodeLoaderProps = {
  code: string;
};

const LazyCodeLoader = ({ code }: LazyCodeLoaderProps) => {
  // lazy load prism react renderer to reduce bundle size
  const loader = React.useCallback(() => {
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
