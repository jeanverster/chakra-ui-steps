import { Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export const Anchor = (props: any) => {
  const { href, children } = props;

  if (!href) {
    return <a {...props} />;
  }

  return (
    <Link href={href} passHref={true}>
      <ChakraLink color="teal.400">{children}</ChakraLink>
    </Link>
  );
};
