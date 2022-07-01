import { Page } from "@/layouts";
import { FrontMatter } from "@/types";
import { GetStaticProps, NextPage } from "next";
import * as React from "react";
import { MDX } from "../../mdx/client";
import { getPost } from "../../mdx/server";

type PostDetailProps = {
  code: string;
  frontmatter: FrontMatter;
};

const PostDetail: NextPage<PostDetailProps> = (props): JSX.Element => {
  const { code, frontmatter } = props;

  return (
    <Page title={frontmatter.title} description={frontmatter.description}>
      <main>
        <MDX source={code} />
      </main>
    </Page>
  );
};

export default PostDetail;

export const getStaticProps: GetStaticProps<PostDetailProps> = async (
  context
) => {
  const { code, frontmatter } = await getPost("getting-started");

  const props = JSON.parse(JSON.stringify({ code, frontmatter }));

  return {
    props,
  };
};

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//   const paths = getPosts().map(({ slug }) => ({
//     params: { slug },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// };
