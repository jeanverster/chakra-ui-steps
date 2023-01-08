import { useCardBg } from "@/hooks/useCardBg";
import { Stack } from "@chakra-ui/react";
import { Suspense } from "react";
import LazyCodeLoader from "../../components/LazyCodeLoader/LazyCodeLoader";
import { CodeExample } from "../../mdx/server";

type CodeHighlightProps = {
  code: CodeExample | undefined;
};

const CodeHighlight = ({ code }: CodeHighlightProps) => {
  const bg = useCardBg();

  if (!code) return null;

  return (
    <Stack
      sx={{
        width: "auto",
        bg,
        mr: "auto",
        alignSelf: "flex-start",
        shadow: "sm",
        rounded: "md",
        overflow: "hidden",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <LazyCodeLoader code={code?.code} />
      </Suspense>
    </Stack>
  );
};

export default CodeHighlight;
