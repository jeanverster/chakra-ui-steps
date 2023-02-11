import { useCardBg } from "@/hooks/useCardBg";
import { Heading } from "@chakra-ui/layout";
import {
  Box,
  Code,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const PROPS = [
  {
    name: "Steps",
    description: "Steps component designed to work seamlessly with Chakra UI",
    props: [
      {
        name: "activeStep",
        type: "number",
        required: true,
        description: "Currently active step",
        default: "0",
      },
      {
        name: "colorScheme",
        type: "string",
        required: false,
        description: "Sets the color accent of the Steps component show",
        default: "green",
      },
      {
        name: "orientation",
        type: "string",
        required: false,
        description: "Sets the orientation of the Steps component",
        default: "horizontal",
      },
      {
        name: "responsive",
        type: "boolean",
        required: false,
        description:
          "Sets whether the component auto switches to vertical orientation on mobile",
        default: "true",
      },
      {
        name: "mobileBreakpoint",
        type: "string",
        required: false,
        description:
          "Sets the breakpoint value at which the component switches to vertical orientation.",
        default: "768px",
      },
      {
        name: "checkIcon",
        type: "React.ComponentType",
        required: false,
        description: "Allows you to provide a custom check icon",
        default: "undefined",
      },
      {
        name: "errorIcon",
        type: "React.ComponentType",
        required: false,
        description: "Allows you to provide a custom error icon",
        default: "undefined",
      },
      {
        name: "onClickStep",
        type: "() => void",
        required: false,
        description: "If defined, allows you to click on the step icons",
        default: "undefined",
      },
      {
        name: "trackColor",
        type: "string",
        required: false,
        description: "Sets the color of the track between the steps.",
      },
      {
        name: "state",
        type: "'loading' | 'error'",
        required: false,
        description: "Let's you set the state to error or loading",
        default: "undefined",
      },
      {
        name: "variant",
        type: "'circles' | 'circles-alt' | 'simple'",
        required: false,
        description: "Sets the variant of the Steps component",
      },
    ],
  },
  {
    name: "Step",
    description: "Step component designed to work seamlessly with Chakra UI",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Sets the title of the step",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Provides extra info about the step",
      },
      {
        name: "icon",
        type: "React.ComponentType",
        required: false,
        description:
          "Custom icon to overwrite the default numerical indicator of the step",
      },
      {
        name: "state",
        type: "'loading' | 'error'",
        required: false,
        description: "Let's you set the state to error or loading",
      },
      {
        name: "isCompletedStep",
        type: "boolean",
        required: false,
        description:
          "Individually control each step state, defaults to active step",
      },
      {
        name: "isKeepError",
        type: "boolean",
        required: false,
        description:
          "Individually control if each step should keep showing the error state",
      },
      {
        name: "checkIcon",
        type: "React.ComponentType",
        required: false,
        description:
          "Allows you to provide a custom check icon that will override the one provided to Steps",
      },
      {
        name: "errorIcon",
        type: "React.ComponentType",
        required: false,
        description:
          "Allows you to provide a custom error icon that will override the one provided to Steps",
      },
    ],
  },
];

const Props = () => {
  const bg = useCardBg();
  return (
    <Box sx={{ maxWidth: "100%" }}>
      {PROPS.map((component) => (
        <Box mt={8} key={component.name} sx={{ maxW: "100%" }}>
          <Heading as="h2" size="lg" mb={4}>
            {`<${component.name} />`}
          </Heading>
          <Box overflowX="auto">
            <Table bg={bg} rounded="md">
              <Thead>
                <Tr
                  sx={{
                    "& > th": {
                      py: 4,
                    },
                  }}
                >
                  <Th>Prop</Th>
                  <Th>Type</Th>
                  <Th>Required</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {component.props.map((prop) => (
                  <Tr
                    sx={{
                      "&:last-child > td": {
                        borderBottom: "none !important",
                      },
                    }}
                    key={prop.name}
                  >
                    <Td>
                      <Text fontWeight={"bold"}>{prop.name}</Text>
                    </Td>
                    <Td>
                      <Code>{prop.type}</Code>
                    </Td>
                    <Td>{prop.required ? "yes" : "no"}</Td>
                    <Td>{prop.description}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Props;
