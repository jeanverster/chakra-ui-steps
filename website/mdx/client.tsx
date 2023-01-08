import * as chakraButtons from "@chakra-ui/button";
import * as chakraColorMode from "@chakra-ui/color-mode";
import * as chakraHooks from "@chakra-ui/hooks";
import * as chakraLayout from "@chakra-ui/layout";
import * as chakraTable from "@chakra-ui/table";
import * as framer from "framer-motion";
import { getMDXComponent } from "mdx-bundler/client";
import React, { useMemo } from "react";
import { components } from "./components";

export const MDX = ({ source }: { source: string }) => {
  const Component = useMemo(
    () =>
      getMDXComponent(source, {
        chakra: {
          ...chakraLayout,
          ...chakraHooks,
          ...chakraButtons,
          ...chakraColorMode,
          ...chakraTable,
        },
        framer,
      }),
    [source]
  );
  // @ts-ignore
  return <Component components={{ ...components }} />;
};
