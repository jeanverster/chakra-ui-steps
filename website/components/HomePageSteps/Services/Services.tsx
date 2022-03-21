import { Box, Heading } from "@chakra-ui/layout";
import {
  Divider,
  RadioGroup,
  Stack,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import * as React from "react";
import { RadioCard } from "../../RadioCard";

type ServicesProps = {};

const options = [
  { label: "Website Design", value: "website-design" },
  { label: "Existing Business", value: "existing-business" },
];

const Services = () => {
  const [service, setService] = React.useState(options[0].value);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "services",
    defaultValue: "website-design",
    onChange: (val) => setService(val),
  });

  const group = getRootProps();

  return (
    <Box sx={{ mb: 8 }}>
      <Heading size="lg" sx={{ mt: 8 }}>
        What services are you looking for?
      </Heading>
      <Text sx={{ mb: 8, mt: 4 }}>
        Let us know below what services you are looking for.
      </Text>
      <Divider mb={8} />
      <RadioGroup
        mb={4}
        name="services"
        defaultValue={service}
        onChange={setService}
      >
        <Stack {...group} spacing={4} direction="row">
          {options.map(({ value }) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default Services;
