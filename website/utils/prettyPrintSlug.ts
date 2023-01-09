// function to pretty print a url slug and capitalize the first letter of each word
export function prettyPrintSlug(slug: string): string {
  if (slug === "/") {
    return "Home";
  }
  return slug
    .replace("/", "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
