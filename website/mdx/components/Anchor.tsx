import { Link as ChakraLink } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";

type AnchorProps = {
  href: string;
  children: React.ReactNode;
} & LinkProps;

export const Anchor = (props: AnchorProps) => {
  const { href, children } = props;

  if (!href) {
    return <a {...props} />;
  }

  return (
    <Link href={href} passHref={true}>
      <ChakraLink>{children}</ChakraLink>
    </Link>
  );
};
