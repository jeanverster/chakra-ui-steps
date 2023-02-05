import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NAV_ITEMS } from "../../constants";
import { Logo } from "../Logo";
import { SideNavItem } from "../SideNavItem";

export const Footer = () => {
  const router = useRouter();
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"container.lg"}
          p={8}
          gap={4}
          flexDir={{ base: "column", md: "row" }}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "flex-start", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Flex flexDir={"column"}>
            <Flex
              sx={{
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                flexDir: ["column", "column", "row"],
              }}
            >
              <Logo width={128} height={32} />
            </Flex>
            <Flex sx={{ gap: 4 }}>
              {NAV_ITEMS.map(({ title, href }) => {
                const active = router.pathname === href;
                return (
                  <SideNavItem
                    title={title}
                    href={href}
                    key={href}
                    active={active}
                    pt={4}
                  />
                );
              })}
            </Flex>
          </Flex>
          <Flex
            sx={{
              flexDir: "column",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <HStack sx={{ justifyContent: "inherit" }}>
              <Text>Made with</Text>
              <Image
                width="30px"
                height="30px"
                alt="Heart icon"
                src={"/heart.png"}
              />
              <Text>by</Text>
              <Link
                target="_blank"
                href="https://twitter.com/jeanverster"
                rel="noopen noreferrer"
              >
                <Text fontWeight="bold">jeanverster</Text>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
