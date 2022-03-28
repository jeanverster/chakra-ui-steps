import { Box, Heading } from "@chakra-ui/layout";
import { RadioGroup, Stack, Text, useRadioGroup } from "@chakra-ui/react";
import * as React from "react";
import { GiBirdHouse, GiGreenhouse, GiSydneyOperaHouse } from "react-icons/gi";
import { RadioCard } from "../../RadioCard";

type Step2Props = {};

const options = [
  { label: "Family home", value: "family-home", icon: GiGreenhouse },
  { label: "Townhouse", value: "townhouse", icon: GiSydneyOperaHouse },
  { label: "Condo", value: "condo", icon: GiBirdHouse },
];

export const Step2 = () => {
  const [service, setService] = React.useState(options[0].value);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Step2",
    defaultValue: undefined,
    onChange: (val) => setService(val),
  });

  const group = getRootProps();

  return (
    <Box sx={{ mb: 8 }}>
      <Heading size="lg" sx={{ mt: 8 }}>
        What&apos;s your dream home?
      </Heading>
      <Text sx={{ mb: 8, mt: 4 }}>Select a property type below.</Text>
      <RadioGroup
        mb={4}
        name="Step2"
        defaultValue={service}
        onChange={setService}
        sx={{ mt: 8 }}
      >
        <Stack {...group} spacing={4} direction="row">
          {options.map(({ value, label, icon }, i) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard icon={icon} key={value} {...radio}>
                {label}
              </RadioCard>
            );
          })}
        </Stack>
      </RadioGroup>
    </Box>
  );
};
