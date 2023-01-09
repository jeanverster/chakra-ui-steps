import { Button, ButtonProps, useClipboard } from "@chakra-ui/react";

interface CopyButtonProps extends ButtonProps {
  code: string;
}

function CopyButton({ code, ...props }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <Button
      size="sm"
      textTransform="uppercase"
      fontSize="xs"
      zIndex="1"
      {...props}
      onClick={onCopy}
    >
      {hasCopied ? "Copied" : "Copy"}
    </Button>
  );
}

export default CopyButton;
