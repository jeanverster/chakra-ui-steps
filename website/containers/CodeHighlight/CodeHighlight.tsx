import { useCardBg } from "@/hooks/useCardBg";
import { Stack, StackProps } from "@chakra-ui/react";
import { Suspense } from "react";
import CopyButton from "../../components/CopyButton/CopyButton";
import LazyCodeLoader from "../../components/LazyCodeLoader/LazyCodeLoader";
import { CodeExample } from "../../mdx/server";

type CodeHighlightProps = StackProps & {
  code: CodeExample | undefined;
  path?: string;
};

const CodeHighlight = ({ code, path, ...rest }: CodeHighlightProps) => {
  const bg = useCardBg();

  const { sx } = rest;

  if (!code) return null;

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
      <Suspense fallback={<div>Loading...</div>}>
        <LazyCodeLoader code={code?.code} />
      </Suspense>
      <CopyButton code={code?.code} position="absolute" top={4} right={4} />
    </Stack>
  );
};

export default CodeHighlight;
