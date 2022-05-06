import { Box, Flex, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/dracula";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import React from "react";

const Pre = styled.pre`
  position: relative;
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  border-radius: 10px;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;

const LanguageFlag = styled(Flex)`
  position: absolute;
  background-color: inherit;
  text-align: center;
  font-weight: 500;
`;

type CodeProps = {
  language: string;
  codeString: string;
  metaString: string;
  className: string;
};

export const Code = (props: CodeProps) => {
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";

  const isBash = props.language === "bash";

  return (
    <Box my={4}>
      <Highlight
        {...defaultProps}
        theme={isDarkMode ? darkTheme : lightTheme}
        code={props.codeString}
        language={props.language as Language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {/* <LanguageFlag px={4} py={2} right={8} rounded="md" top={-8}>
              <Text fontSize="sm" fontWeight="bold">
                {props.language.toUpperCase()}
              </Text>
            </LanguageFlag> */}
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        )}
      </Highlight>
    </Box>
  );
};

export const preToCodeBlock = (
  preProps: any
):
  | {
      language: string;
      codeString: string;
      metaString: string;
      className: string;
    }
  | undefined => {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.type === "code"
  ) {
    // we have a <pre><code> situation
    const { children: codeString, className = "" } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      metaString:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang.split("#")[1]
          : "",
      language:
        matches && matches.groups && matches.groups.lang
          ? matches.groups.lang.split("#")[0]
          : "",
    };
  }
};
