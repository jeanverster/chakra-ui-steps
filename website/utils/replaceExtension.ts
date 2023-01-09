// util function which takes in an extension and removes it from a string
export const replaceExtension = (extension: string, str: string) => {
  return str
    .replace(extension, "")
    .replace(/([A-Z])/g, " $1")
    .trim();
};
