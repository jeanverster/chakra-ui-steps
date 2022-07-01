import {
  Heading,
  List,
  ListIcon,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ReactHTMLElement, ReactNode } from "react";
import { CgCheckO } from "react-icons/cg";
import { slugify } from "../../utils/slugify";
import { Anchor } from "./Anchor";
import { BlockQuote } from "./BlockQuote";
import { Code, preToCodeBlock } from "./Code";
import { Img } from "./Image";
import { P } from "./P";

export const components = {
  img: Img,
  p: P,
  a: Anchor,
  ul: (props: any) => {
    return <List spacing={3} sx={{ my: 4 }} {...props} />;
  },
  li: (props: { children: ReactNode }) => {
    return (
      <ListItem sx={{ alignItems: "center", display: "flex" }}>
        <ListIcon as={CgCheckO} color="green.500" />
        {props.children}
      </ListItem>
    );
  },

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
    const {
      children: { props: p },
    } = props;
    return (
      <Heading
        fontWeight="bold"
        lineHeight="taller"
        fontSize="4xl"
        id={slugify(p?.children)}
        {...props}
      />
    );
  },
  h2: function HeadlineTwo(props: any) {
    const {
      children: { props: p },
    } = props;
    return (
      <Heading
        fontWeight="bold"
        lineHeight="taller"
        fontSize="3xl"
        id={slugify(p?.children)}
        {...props}
      />
    );
  },
  h3: function HeadlineThree(props: any) {
    const {
      children: { props: p },
    } = props;
    return (
      <Heading
        fontWeight="bold"
        lineHeight="taller"
        fontSize="2xl"
        id={slugify(p?.children)}
        {...props}
      />
    );
  },
  table: function TableComponent(props: any) {
    return (
      <TableContainer>
        <Table variant="simple" {...props} />
      </TableContainer>
    );
  },
  th: function TableHead(props: any) {
    return <Th {...props} />;
  },
  thead: function TableHead(props: any) {
    return <Thead {...props} />;
  },
  tbody: function TableBody(props: any) {
    return <Tbody {...props} />;
  },
  td: function TableCell(props: any) {
    return <Td {...props} />;
  },
  tr: function TableRow(props: any) {
    return <Tr {...props} />;
  },
};
