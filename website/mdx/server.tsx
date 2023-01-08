import * as chakraButtons from "@chakra-ui/button";
import * as chakraColorMode from "@chakra-ui/color-mode";
import * as chakraHooks from "@chakra-ui/hooks";
import * as chakraLayout from "@chakra-ui/layout";
import * as chakraTable from "@chakra-ui/table";
import * as framerMotion from "framer-motion";
import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import path from "path";
import * as reactIconsRI from "react-icons/ri";

const EXAMPLES_PATH = path.join(process.cwd(), "code-samples/examples");
const SNIPPETS_PATH = path.join(process.cwd(), "code-samples/snippets");
const DOCS_PATH = path.join(process.cwd(), "docs");

export type CodeExample = {
  code: string;
  fileName: string;
  filePath: string;
};

// recursively read in all files in the examples directory except for the index.ts file and output an array of strings containing the stringified buffer
export const getFileStrings = (directory = EXAMPLES_PATH) => {
  let files: CodeExample[] = [];
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      files = files.concat(getFileStrings(absolute));
    } else {
      const fileName = path.basename(absolute);
      const filePath = path.join(directory, fileName);
      if (fileName !== "index.ts") {
        const code = fs.readFileSync(absolute).toString().trim();
        files.push({
          code,
          fileName,
          filePath,
        });
      }
    }
  }
  return files;
};

export const getFileString = (filePath: string): CodeExample | undefined => {
  try {
    const absPath = path.join(process.cwd(), filePath);
    const file = fs.readFileSync(absPath);
    return {
      code: file.toString().trim(),
      fileName: path.basename(absPath),
      filePath,
    };
  } catch (error) {
    console.log(error);
  }
};

type Doc = {
  code: string;
  fileName: string;
};

const chakra = Object.keys({
  ...chakraHooks,
  ...chakraLayout,
  ...chakraButtons,
  ...chakraColorMode,
  ...chakraTable,
}).filter((key) => key !== "__esModule");

const framer = Object.keys(framerMotion).filter((key) => key !== "__esModule");

const ri = Object.keys(reactIconsRI).filter((key) => key !== "__esModule");

const SECTIONS_PATH = path.join(process.cwd(), "sections");

export const getSourceOfFile = (filePath: string) => {
  return fs.readFileSync(
    path.join(SECTIONS_PATH, filePath, "index.mdx"),
    "utf-8"
  );
};

// export const getSections = (): {
//   frontmatter: FrontMatter;
//   slug: string;
// }[] => {
//   return fs.readdirSync(SECTIONS_PATH).map((filePath) => {
//     const source = getSourceOfFile(filePath);
//     const slug = filePath.replace(/\.mdx?$/, "");
//     const { data } = matter(source);

//     return {
//       frontmatter: data as FrontMatter,
//       slug: slug,
//     };
//   });
// };

export const getSection = async (slug: string) => {
  const source = getSourceOfFile(slug);
  const imagesUrl = `/img/blog/${slug}`;
  const directory = path.join(SECTIONS_PATH, slug);

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: directory,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      return options;
    },
    esbuildOptions: (options) => {
      options.outdir = path.join(process.cwd(), "public", imagesUrl);
      options.loader = {
        ...options.loader,
        ".webp": "file",
        ".jpeg": "file",
        ".jpg": "file",
        ".svg": "file",
        ".png": "file",
        ".gif": "file",
      };

      options.publicPath = imagesUrl;
      options.write = true;
      return options;
    },
    globals: {
      "@chakra-ui/react": {
        varName: "chakra",
        namedExports: chakra,
        defaultExport: false,
      },
      "framer-motion": {
        varName: "framer",
        namedExports: framer,
        defaultExport: false,
      },
      "@react-icons/ri": {
        varName: "ri",
        namedExports: ri,
        defaultExport: false,
      },
    },
  });

  return {
    frontmatter,
    code,
  };
};
