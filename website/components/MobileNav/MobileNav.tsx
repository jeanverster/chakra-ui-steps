import { useCardBg } from "@/hooks/useCardBg";
import { Box } from "@chakra-ui/layout";
import {
  Flex,
  IconButton,
  Image,
  Link as ChakraLink,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { RiMenu4Fill } from "react-icons/ri";
import pkgJson from "../../../chakra-ui-steps/package.json";
import { NAV_ITEMS } from "../../constants";
import { SideNavItem } from "../SideNavItem";

type MobileNavProps = {};

const MotionFlex = motion(Flex);

const MobileNav = (props: MobileNavProps) => {
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
          height: "96px",
          px: 8,
          top: 0,
          position: "fixed",
          zIndex: "sticky",
          bg,
          // backdropFilter: "blur(10px)",
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
                        sx={{ ":not(:last-child)": { mb: 2 }, py: 2 }}
                      />
                    );
                  })}
                </Box>
              );
            })}
            {/* <Flex
              bg={bg}
              borderTopWidth={1}
              borderBottomLeftRadius="md"
              borderBottomRightRadius="md"
            >
              <Flex
                transition="all 0.2s ease"
                _hover={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                borderBottomLeftRadius="md"
                borderRightWidth={1}
                justify="center"
                flex={1}
                p={4}
              >
                <Link href="/profile">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<FiUser />}
                    aria-label="Profile"
                  />
                </Link>
              </Flex>
              <Flex
                transition="all 0.2s ease"
                _hover={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                borderRightWidth={1}
                justify="center"
                flex={1}
                p={4}
              >
                <Link href="/create">
                  <IconButton
                    size="sm"
                    variant="ghost"
                    icon={<FiPlus />}
                    aria-label="Create"
                  />
                </Link>
              </Flex>
              <Flex
                transition="all 0.2s ease"
                _hover={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                borderBottomRightRadius="md"
                overflow="hidden"
                justify="center"
                flex={1}
                p={4}
              >
                <ColorModeSwitcher ml={0} />
              </Flex>
            </Flex> */}
          </MotionFlex>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
