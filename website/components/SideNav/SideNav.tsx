import { Flex } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Divider,
  Image,
  Link as ChakraLink,
  Tag,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FaRegStar } from "react-icons/fa";
import { ColorModeSwitcher } from "..";
import pkgJson from "../../../chakra-ui-steps/package.json";
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
      display={["none", "none", "block"]}
      sx={{
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
      <Flex mb={4} align="center" width="100%" justify="flex-start">
        <Image
          alt="Chakra UI Logo"
          width="24px"
          height="24px"
          rounded="full"
          src={"/54212428.png"}
        />
        <Link passHref href="/">
          <ChakraLink
            ml={2}
            textAlign="left"
            fontSize="md"
            fontWeight={"bold"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
            _hover={{
              cursor: "pointer",
              color: "teal.500",
              transition: "all 0.2s ease",
            }}
          >
            chakra-ui-steps
            <Tag size="sm">v{pkgJson.version}</Tag>
          </ChakraLink>
        </Link>
      </Flex>
      {NAV_ITEMS.map(({ title, items }) => {
        return (
          <Box key="title" sx={{ ":not(:first-child)": { mt: 4 } }}>
            <Text sx={{ mb: 4 }} color="teal.500" fontWeight="extrabold">
              {title}
            </Text>
            {items.map(({ title, href }, i) => {
              const active = router.pathname === href;
              return (
                <SideNavItem
                  title={title}
                  href={href}
                  key={href}
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
