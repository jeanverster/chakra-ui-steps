import { useCardBg } from "@/hooks/useCardBg";
import { Stack, StackProps } from "@chakra-ui/react";
import Highlight, { Language } from "prism-react-renderer";
import CopyButton from "../../components/CopyButton/CopyButton";
import LazyCodeLoader from "../../components/LazyCodeLoader/LazyCodeLoader";

type CodeHighlightProps = StackProps & {
  path?: string;
  prismProps?: Omit<
    React.ComponentProps<typeof Highlight>,
    "Prism" | "language" | "children"
  > & {
    language?: Language;
  };
};

const CodeHighlight = ({ path, prismProps, ...rest }: CodeHighlightProps) => {
  const bg = useCardBg();

  const { sx } = rest;

  return (
    <Stack
      sx={{
        width: "auto",
        maxWidth: "100%",
        bg,
        mr: "auto",
        alignSelf: "flex-start",
        shadow: "sm",
        rounded: "md",
        overflow: "hidden",
        position: "relative",
        sx,
      }}
      {...rest}
    >
      <LazyCodeLoader {...prismProps} />
      <CopyButton
        code={prismProps?.code || ""}
        position="absolute"
        top={4}
        right={4}
      />
    </Stack>
  );
};

export default CodeHighlight;
