import { useCardBg } from "@/hooks/useCardBg";
import { Flex } from "@chakra-ui/layout";
import {
  Button,
  Container,
  Image,
  Link as ChakraLink,
  Select,
  Tag,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegStar } from "react-icons/fa";
import { ColorModeSwitcher } from "..";
import pkgJson from "../../../chakra-ui-steps/package.json";
import { NAV_ITEMS } from "../../constants";
import { Store, useVariantContext } from "../../pages/_app";
import { RepoPayload } from "../../types";
import { SideNavItem } from "../SideNavItem";

type SideNavProps = {
  repo: RepoPayload | undefined;
};

const NAV_HEIGHT = "96px";

type VariantItems = {
  label: string;
  value: Store["variant"];
}[];

export const VARIANT_ITEMS: VariantItems = [
  {
    label: "Simple",
    value: "simple",
  },
  {
    label: "Circles",
    value: "circles",
  },
  {
    label: "Circles Alt",
    value: "circles-alt",
  },
];

const SideNav = ({ repo }: SideNavProps) => {
  const router = useRouter();

  const [_, setVariant] = useVariantContext();

  const bg = useCardBg();

  return (
    <Flex
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        height: NAV_HEIGHT,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bg,
        zIndex: "sticky",
        display: {
          base: "none",
          md: "flex",
        },
      }}
    >
      <Container
        maxW="container.lg"
        className="wrapper"
        sx={{
          display: "flex",
          gap: 4,
          padding: [0, 0, 4],
          mx: "auto",
          minWidth: 0,
          justifyContent: "space-between",
        }}
      >
        <Flex sx={{ alignItems: "center" }}>
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
              <Tag size="sm" sx={{ ms: 2 }}>
                v{pkgJson.version}
              </Tag>
            </ChakraLink>
          </Link>
        </Flex>

        <Flex as="nav" sx={{ alignItems: "center", gap: 3 }}>
          {NAV_ITEMS.map(({ title, href }) => {
            const active = router.pathname === href;
            return (
              <SideNavItem
                title={title}
                href={href}
                key={href}
                active={active}
              />
            );
          })}
        </Flex>
        <Flex sx={{ justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
          <ColorModeSwitcher />
          <a href={repo?.html_url} target="_blank" rel="noreferrer">
            <Button variant="ghost" size="sm" leftIcon={<FaRegStar />}>
              {repo?.stargazers_count}
            </Button>
          </a>
          <Select
            size="sm"
            onChange={(e) => {
              setVariant({
                variant: e.target.value as Store["variant"],
              });
            }}
            rounded="md"
          >
            {VARIANT_ITEMS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Flex>
      </Container>
    </Flex>
  );
};

export default SideNav;
