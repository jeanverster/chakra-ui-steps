import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

// const Button = {
//   // The styles all button have in common
//   baseStyle: {
//     fontWeight: "bold",
//     textTransform: "uppercase",
//     borderRadius: "base", // <-- border radius is same for all variants and sizes
//   },
//   // Two sizes: sm and md
//   sizes: {
//     sm: {
//       fontSize: "sm",
//       px: 4, // <-- px is short for paddingLeft and paddingRight
//       py: 3, // <-- py is short for paddingTop and paddingBottom
//     },
//     md: {
//       fontSize: "md",
//       px: 6, // <-- these values are tokens from the design system
//       py: 4, // <-- these values are tokens from the design system
//     },
//   },
//   // Two variants: outline and solid
//   variants: {
//     outline: {
//       border: "2px solid",
//       borderColor: "purple.500",
//       color: "purple.500",
//     },
//     solid: {
//       bg: "purple.500",
//       color: "white",
//     },
//   },
//   // The default size and variant values
//   defaultProps: {
//     size: "md",
//     variant: "outline",
//   },
// };

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme({
  styles: {
    global: (props: any) => {
      const scrollbarColor =
        props.colorMode === "light"
          ? `${props.theme.colors.teal["500"]} ${props.theme.colors.gray["300"]}`
          : `${props.theme.colors.teal["500"]} ${props.theme.colors.gray["700"]}`;
      return {
        "*": {
          scrollbarWidth: "8px",
          scrollbarColor,
        },
        /* Chrome, Edge, and Safari */
        "*::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "*::-webkit-scrollbar-track": {
          background:
            props.colorMode === "light"
              ? props.theme.colors.gray["200"]
              : props.theme.colors.gray["700"],
        },

        "*::-webkit-scrollbar-thumb": {
          backgroundColor:
            props.colorMode === "dark"
              ? props.theme.colors.gray["600"]
              : props.theme.colors.gray["400"],
          borderRadius: "4px",
        },
        ".prism-code": {
          // whiteSpace: "pre-wrap",
          overflowX: "auto",
        },
      };
    },
  },
  components: {
    Steps,
    IconButton: {
      baseStyle: {
        fontWeight: "bold",
        _focus: {
          boxShadow: "none",
          borderWidth: "1px",
        },
      },
      sizes: {
        xs: {
          fontSize: "xs",
          px: 0.5, // <-- px is short for paddingLeft and paddingRight
          py: 0.5, // <-- py is short for paddingTop and paddingBottom
        },
      },
    },
  },
  config,
  colors: {
    brand: {
      50: "#FDF2F8 ",
      100: "#FCE7F3",
      200: "#FBCFE8",
      300: "#F9A8D4",
      400: "#F472B6",
      500: "#EC4899",
      600: "#DB2777",
      700: "#BE185D",
      800: "#9D174D",
      900: "#831843",
    },
  },
  textStyles: {
    heading: {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "2rem", md: "3.5rem" },
    },
    "heading-2": {
      fontFamily: "heading",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: "-0.015em",
      lineHeight: "1.24",
      fontSize: { base: "1.75rem", md: "2.75rem" },
    },
    caps: {
      textTransform: "uppercase",
      fontSize: "sm",
      letterSpacing: "widest",
      fontWeight: "bold",
    },
  },
  fonts: {
    heading: "Sora",
    body: "Manrope",
  },
  mdx: {
    h1: {
      mt: "2rem",
      mb: ".25rem",
      lineHeight: 1.2,
      fontWeight: "bold",
      fontSize: "1.875rem",
      letterSpacing: "-.025em",
    },
    h2: {
      mt: "4rem",
      mb: "0.5rem",
      lineHeight: 1.3,
      fontWeight: "semibold",
      fontSize: "1.5rem",
      letterSpacing: "-.025em",
      "& + h3": {
        mt: "1.5rem",
      },
    },
    h3: {
      mt: "3rem",
      // mb: "0.5rem",
      lineHeight: 1.25,
      fontWeight: "semibold",
      fontSize: "1.25rem",
      letterSpacing: "-.025em",
    },
    h4: {
      mt: "3rem",
      lineHeight: 1.375,
      fontWeight: "semibold",
      fontSize: "1.125rem",
    },
    a: {
      color: "teal.500",
      fontWeight: "semibold",
      transition: "color 0.15s",
      transitionTimingFunction: "ease-out",
      _hover: {
        color: "teal.600",
      },
    },
    p: {
      mt: "1.25rem",
      lineHeight: 1.7,
      "blockquote &": {
        mt: 0,
      },
    },
    hr: {
      my: "4rem",
    },
    blockquote: {
      bg: "orange.100",
      borderWidth: "1px",
      borderColor: "orange.200",
      rounded: "lg",
      px: "1.25rem",
      py: "1rem",
      my: "1.5rem",
    },
    ul: {
      mt: "1.5rem",
      ml: "1.25rem",
      "blockquote &": { mt: 0 },
      "& > * + *": {
        mt: "0.25rem",
      },
    },
    code: {
      rounded: "sm",
      px: "1",
      fontSize: "0.875em",
      py: "2px",
      whiteSpace: "nowrap",
      lineHeight: "normal",
    },
  },
});

export default theme;
