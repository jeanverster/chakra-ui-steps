import { Flex, FlexProps, Heading } from "@chakra-ui/react";

type ComponentDocsProps = FlexProps & {
  title: string;
};

const ComponentDocs = (props: ComponentDocsProps): JSX.Element => {
  return (
    <Flex {...props}>
      <Heading>{props.title}</Heading>
    </Flex>
  );
};

export default ComponentDocs;
