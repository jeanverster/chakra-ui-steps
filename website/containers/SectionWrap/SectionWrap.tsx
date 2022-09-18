import { useCardBg } from "@/hooks/useCardBg";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Heading } from "@chakra-ui/layout";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineCode, AiOutlineEye } from "react-icons/ai";
import CopyButton from "../../components/CopyButton/CopyButton";
import LazyCodeLoader from "../../components/LazyCodeLoader/LazyCodeLoader";

export type CodeConfig = {
  code: string;
  filename: string;
  language: string;
};

type SectionWrapProps = {
  preview: React.ReactNode;
  title: string;
  description?: string;
  code: CodeConfig[];
};

const SectionWrap = ({
  preview,
  code = [],
  title,
  description,
}: SectionWrapProps) => {
  const bg = useCardBg();
  const selectedBg = useColorModeValue("blue.500", "blue.400");

  // boolean value which is true on mobile and false on desktop
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Tabs
      variant="unstyled"
      isFitted={isMobile}
      isLazy
      lazyBehavior="keepMounted"
    >
      <Stack
        direction={["column", "row"]}
        justify={"space-between"}
        align={["flex-start", "center"]}
        gap={2}
      >
        <Heading fontSize="2xl">{title}</Heading>
        <TabList
          sx={{
            width: ["100%", "auto"],
            bg,
            mr: "auto",
            alignSelf: "flex-start",
            shadow: "sm",
            p: "4px",
            gap: "4px",
            borderRadius: "12px",
            "& .chakra-tabs__tab": {
              gap: 1,
              fontSize: "sm",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              fontWeight: "bold",
              _selected: {
                bg: selectedBg,
                shadow: "sm",
              },
            },
          }}
        >
          <Tab _selected={{ color: "white" }}>
            <AiOutlineEye />
            Preview
          </Tab>
          <Tab _selected={{ color: "white", bg: "green.400" }}>
            <AiOutlineCode />
            Code
          </Tab>
        </TabList>
      </Stack>
      {description && (
        <Heading as="p" fontSize="md" color="gray.500" mt={2}>
          {description}
        </Heading>
      )}
      <TabPanels mt={8}>
        <TabPanel p={0}>{preview}</TabPanel>
        <TabPanel sx={{ p: 0, mt: 4, bg, rounded: "md", overflow: "hidden" }}>
          <Tabs sx={{ p: 0 }}>
            <Stack>
              <TabList>
                {code.map((item) => (
                  <Tab
                    key={item.language}
                    _selected={{
                      bg: selectedBg,
                      color: "white",
                      shadow: "sm",
                      borderColor: "blue.500",
                    }}
                  >
                    {item.filename.split(".")[0]}.{item.language}
                  </Tab>
                ))}
              </TabList>
            </Stack>
            <TabPanels>
              {code.map((item) => (
                <TabPanel
                  sx={{ p: 0, position: "relative" }}
                  key={item.language}
                >
                  <LazyCodeLoader code={item?.code} />
                  <CopyButton
                    code={item?.code}
                    position="absolute"
                    top={4}
                    right={4}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SectionWrap;
