import { Heading } from "@chakra-ui/react";
import { ReactHTMLElement } from "react";
import { Anchor } from "./Anchor";
import { BlockQuote } from "./BlockQuote";
import { Code, preToCodeBlock } from "./Code";
import { Img } from "./Image";
import { P } from "./P";

export const components = {
  img: Img,
  p: P,
  a: Anchor,
  pre: function codeBlock(
    preProps: Partial<ReactHTMLElement<HTMLPreElement>["props"]>
  ) {
    const props = preToCodeBlock(preProps);

    if (props) {
      return <Code {...props} />;
    }

    return <pre {...preProps} />;
  },
  blockquote: BlockQuote,
  h1: function Headline(props: any) {
    return (
      <Heading
        fontWeight="bold"
        lineHeight="taller"
        fontSize="4xl"
        {...props}
      />
    );
  },
  h2: function Headline(props: any) {
    return (
      <Heading
        fontWeight="bold"
        lineHeight="taller"
        fontSize="3xl"
        {...props}
      />
    );
  },
  h3: function Headline(props: any) {
    return (
      <Heading
        fontWeight="bold"
        lineHeight="taller"
        fontSize="2xl"
        {...props}
      />
    );
  },
};
