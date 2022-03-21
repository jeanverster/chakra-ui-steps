export type Post = {
  frontmatter: FrontMatter;
  slug: string;
};

export type FrontMatter = {
  title: string;
  description: string;
};
