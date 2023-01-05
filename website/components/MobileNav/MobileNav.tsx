import { useCardBg } from "@/hooks/useCardBg";
import {
  Button,
  Flex,
  IconButton,
  Image,
  Link as ChakraLink,
  Select,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FaRegStar } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import pkgJson from "../../../chakra-ui-steps/package.json";
import { NAV_HEIGHT, NAV_ITEMS } from "../../constants";
import { Store, useVariantContext } from "../../pages/_app";
import { RepoPayload } from "../../types";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { VARIANT_ITEMS } from "../SideNav/SideNav";
import { SideNavItem } from "../SideNavItem";

type MobileNavProps = {
  repo: RepoPayload | undefined;
};

const MotionFlex = motion(Flex);

const MobileNav = ({ repo }: MobileNavProps) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const router = useRouter();
  const target = React.createRef<HTMLButtonElement>();
  const bg = useCardBg();

  React.useEffect(() => {
    if (isOpen && target.current) {
      disableBodyScroll(target.current);
    } else if (target.current) {
      enableBodyScroll(target.current);
    }
  }, [isOpen, target]);

  const [_, setVariant] = useVariantContext();

  return (
    <>
      <Flex
        mb={4}
        align="center"
        width="100%"
        justify="flex-start"
        display={{
          base: "flex",
          md: "none",
        }}
        sx={{
          height: NAV_HEIGHT,
          px: 8,
          top: 0,
          position: "fixed",
          zIndex: "sticky",
          bg,
          backdropFilter: "blur(10px)",
        }}
      >
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
              justifyContent: "flex-start",
              gap: 4,
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
        <IconButton
          ref={target}
          variant="ghost"
          aria-label="Open mobile menu"
          onClick={() => onToggle()}
          icon={<RiMenu4Fill size={24} />}
        />
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <MotionFlex
            left={0}
            right={0}
            top="96px"
            bottom={0}
            pos="fixed"
            bg="blackAlpha.600"
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <MotionFlex
            exit={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 35 }}
            sx={{
              bg: bg,
              top: "96px",
              shadow: "lg",
              pb: 8,
              px: 8,
              as: "nav",
              left: 0,
              right: 0,
              zIndex: "sticky",
              position: "fixed",
              flexDirection: "column",
              flex: 1,
            }}
          >
            {NAV_ITEMS.map(({ title, href }) => {
              const active = router.pathname === href;
              return (
                <SideNavItem
                  title={title}
                  href={href}
                  key={href}
                  mb={6}
                  active={active}
                />
              );
            })}
            <Flex
              sx={{
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 4,
              }}
            >
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
              <ColorModeSwitcher />
              <a href={repo?.html_url} target="_blank" rel="noreferrer">
                <Button variant="ghost" size="sm" leftIcon={<FaRegStar />}>
                  {repo?.stargazers_count}
                </Button>
              </a>
            </Flex>
          </MotionFlex>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
