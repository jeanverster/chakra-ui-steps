import { Link as ChakraLink } from "@chakra-ui/react";

type AnchorProps = {
  href: string;
  children: React.ReactNode;
};

export const Anchor = (props: AnchorProps) => {
  const { href, children } = props;

  if (!href) {
    return <a {...props} />;
  }

  return (
    <ChakraLink color="blue.500" {...props}>
      {children}
    </ChakraLink>
  );
};
