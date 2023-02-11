import fs from "fs";
import path from "path";

const EXAMPLES_PATH = path.join(process.cwd(), "code-samples/examples");
const RECIPES_PATH = path.join(process.cwd(), "code-samples/recipes");

// recursively read in all files in the examples directory except for the index.ts file and output an array of strings containing the stringified buffer
export const getCodeExamples = (directory = EXAMPLES_PATH) => {
  let files: CodeExample[] = [];
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      files = files.concat(getCodeExamples(absolute));
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

export const getCodeExample = (filepath: string): CodeExample | undefined => {
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
  filepath?: string;
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
