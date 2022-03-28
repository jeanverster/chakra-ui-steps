import { Text, TextProps } from "@chakra-ui/layout";

export const P = (props: TextProps) => {
  if (typeof props.children !== "string") {
    return <>{props.children}</>;
  }

  return (
    <Text mb={8} fontSize="lg" sx={{ my: 2 }} lineHeight="taller" {...props} />
  );
};
