import { Box, Heading } from "@chakra-ui/layout";
import { RadioGroup, Stack, Text, useRadioGroup } from "@chakra-ui/react";
import * as React from "react";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { RadioCard } from "../../RadioCard";

type Step1Props = {};

const options = [
  { label: "Refinance", value: "refinance", icon: GiReceiveMoney },
  { label: "Buy a home", value: "buy-a-home", icon: GiMoneyStack },
];

export const Step1 = () => {
  const [service, setService] = React.useState(options[0].value);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Step1",
    defaultValue: "website-design",
    onChange: (val) => setService(val),
  });

  const group = getRootProps();

  return (
    <Box sx={{ mb: 8 }}>
      <Heading size="lg" sx={{ mt: 8 }}>
        What are you looking for today?
      </Heading>
      <Text sx={{ mb: 8, mt: 4 }}>Select a product below to get started.</Text>

      <RadioGroup
        mb={4}
        name="Step1"
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
