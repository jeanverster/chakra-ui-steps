import { Flex } from "@chakra-ui/layout";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { FaRegStar } from "react-icons/fa";
import { ColorModeSwitcher } from "..";
import { NAV_ITEMS } from "../../constants";
import { RepoPayload } from "../../types";
import { SideNavItem } from "../SideNavItem";

type SideNavProps = {};

const NAV_HEIGHT = "96px";
const SideNav = (props: SideNavProps): JSX.Element => {
  const router = useRouter();
  const [repo, setRepo] = React.useState<RepoPayload | undefined>();

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api.github.com/repos/jeanverster/chakra-ui-steps"
      );
      const json = await res.json();
      setRepo(json);
    }
    fetchData();
  }, []);

  return (
    <Box
      className="side-nav"
      as="aside"
      sx={{
        display: { xs: "none", sm: "inherit" },
        gridTemplateColumns: { xs: "none", sm: "1fr 1fr" },
        gridAutoRows: "min-content",
        h: "100vh",
        height: "max-content",
        maxHeight: `calc(100vh - ${NAV_HEIGHT})`,
        maxW: "100%",
        position: "sticky",
        pt: 5,
        px: 8,
        top: "12vmin",
      }}
    >
      {NAV_ITEMS.map(({ title, items }) => {
        return (
          <Box key="title" sx={{ ":not(:first-child)": { mt: 4 } }}>
            <Text sx={{ mb: 4 }} color="blue.200" fontWeight="extrabold">
              {title}
            </Text>
            {items.map(({ title, path }, i) => {
              const active = router.pathname === path;
              return (
                <SideNavItem
                  title={title}
                  href={path}
                  key={path}
                  active={active}
                  mr={i < items.length - 1 ? 4 : 0}
                  sx={{ ":not(:last-child)": { mb: 2 } }}
                />
              );
            })}
          </Box>
        );
      })}
      <Divider sx={{ my: 4 }} />
      <Flex sx={{ justifyContent: "space-between" }}>
        <ColorModeSwitcher />
        <a href={repo?.html_url} target="_blank" rel="noreferrer">
          <Button ml={2} variant="ghost" size="sm" leftIcon={<FaRegStar />}>
            {repo?.stargazers_count}
          </Button>
        </a>
      </Flex>
    </Box>
  );
};

export default SideNav;
