import { FrontMatter } from "@/types";
import { Flex, Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { MDX } from "../../mdx/client";
import { slugify } from "../../utils/slugify";
type PostDetailProps = {
  code: string;
  frontmatter: FrontMatter;
};

export const NavSection = (props: PostDetailProps): JSX.Element => {
  const {
    code,
    frontmatter: { title, description },
    ...rest
  } = props;

  return (
    <Flex {...rest} sx={{ flexDir: "column" }} id={slugify(title)}>
      <Heading fontSize="3xl" mb={6} textAlign="left">
        {title}
      </Heading>
      {description && (
        <Text mt={6} mb={10} fontWeight="bold">
          {description}
        </Text>
      )}
      <MDX source={code} />
    </Flex>
  );
};
