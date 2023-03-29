import { Heading, List, ListItem } from "@chakra-ui/react";
import { ReactHTMLElement } from "react";
import { Anchor } from "./Anchor";
import { BlockQuote } from "./BlockQuote";
import { Code as CodeRenderer, preToCodeBlock } from "./Code";
import { Img } from "./Image";
import { P } from "./P";
export const components = {
  img: Img,
  p: P,
  a: Anchor,
  span: function span(props: any) {
    return <span {...props} />;
  },
  pre: function codeBlock(
    preProps: Partial<ReactHTMLElement<HTMLPreElement>["props"]>
  ) {
    const props = preToCodeBlock(preProps);

    if (props) {
      return <CodeRenderer {...props} />;
    }

    return <pre {...preProps} />;
  },
  li: function li(props: any) {
    return <ListItem {...props}>{props.children}</ListItem>;
  },
  ul: function ul(props: any) {
    return <List {...props} />;
  },
  br: function br(props: any) {
    return <br />;
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
