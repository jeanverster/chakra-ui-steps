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
const RECIPES_PATH = path.join(process.cwd(), "code-samples/recipes");
const DOCS_PATH = path.join(process.cwd(), "docs");

// recursively read in all files in the examples directory except for the index.ts file and output an array of strings containing the stringified buffer
export const getFileStrings = (directory = EXAMPLES_PATH) => {
  let files: CodeExample[] = [];
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      files = files.concat(getFileStrings(absolute));
    } else {
      const filename = path.basename(absolute);
      const filepath = path.join(directory, filename);
      if (filename !== "index.ts") {
        const code = fs.readFileSync(absolute).toString().trim();
        files.push({
          code,
          filename,
          filepath,
        });
      }
    }
  }
  return files;
};

export const getFileString = (filepath: string): CodeExample | undefined => {
  try {
    const absPath = path.join(process.cwd(), filepath);
    const file = fs.readFileSync(absPath);
    return {
      code: file.toString().trim(),
      filename: path.basename(absPath),
      filepath,
    };
  } catch (error) {
    console.log(error);
  }
};

export type CodeExample = {
  code: string;
  filename: string;
  filepath: string;
  language?: string;
};

type MultipleCodeSampleResults = {
  dir: string;
  files: CodeExample[];
}[];

export function dirToFileArray(dir = RECIPES_PATH): MultipleCodeSampleResults {
  let results = [];

  for (const recipe of fs.readdirSync(dir)) {
    const absolute = path.join(dir, recipe);
    if (fs.statSync(absolute).isDirectory()) {
      const files = fs.readdirSync(absolute);
      let res: CodeExample[] = [];
      for (const file of files) {
        const filepath = path.join(dir, recipe, file);
        if (fs.statSync(filepath).isDirectory()) {
          res = res.concat(
            fs
              .readdirSync(filepath)
              .filter((innerFile) => path.basename(innerFile) !== "index.ts")
              .map((innerFile) => {
                const innerFilePath = path.join(dir, recipe, file, innerFile);
                return {
                  code: fs.readFileSync(innerFilePath).toString().trim(),
                  filename: path.basename(innerFilePath),
                  filepath: innerFilePath,
                  language: path.extname(innerFilePath).replace(".", ""),
                };
              })
          );
        } else {
          res.push({
            code: fs.readFileSync(filepath).toString().trim(),
            filename: path.basename(filepath),
            filepath,
            language: path.extname(filepath).replace(".", ""),
          });
        }
      }
      results.push({
        dir: path.basename(recipe),
        files: res,
      });
    }
  }

  return results;
}

type Doc = {
  code: string;
  filename: string;
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

export const getSourceOfFile = (filepath: string) => {
  return fs.readFileSync(
    path.join(SECTIONS_PATH, filepath, "index.mdx"),
    "utf-8"
  );
};

// export const getSections = (): {
//   frontmatter: FrontMatter;
//   slug: string;
// }[] => {
//   return fs.readdirSync(SECTIONS_PATH).map((filepath) => {
//     const source = getSourceOfFile(filepath);
//     const slug = filepath.replace(/\.mdx?$/, "");
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
