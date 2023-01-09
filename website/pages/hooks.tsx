import { Page } from "@/layouts";
import { Heading } from "@chakra-ui/react";

type HooksProps = {};

const Hooks = (props: HooksProps) => {
  return (
    <Page
      title="Hooks"
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Documentation for the hooks provided by chakra-ui-steps."
    >
      <Heading fontSize={["2xl", "4xl"]} sx={{ mb: 6 }}>
        Hooks
      </Heading>
    </Page>
  );
};

export default Hooks;
