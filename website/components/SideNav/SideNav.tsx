import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { NAV_ITEMS } from "../../constants";
import { SideNavItem } from "../SideNavItem";

type SideNavProps = {};

const SideNav = (props: SideNavProps): JSX.Element => {
  const router = useRouter();
  return (
    <Box sx={{ position: "sticky", top: 0, h: "100vh", p: 8 }}>
      <Link href="/" passHref>
        <Heading fontSize={{ sm: "md", md: "lg" }} fontWeight="extrabold">
          chakra-ui-steps
        </Heading>
      </Link>
      {NAV_ITEMS.map(({ title, items }) => {
        return (
          <Box key="title" sx={{ ":not(:first-child)": { mt: 4 } }}>
            <Text sx={{ mb: 4 }} fontWeight="extrabold">
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
    </Box>
  );
};

export default SideNav;
