import { Box, Heading } from "@chakra-ui/layout";
import { RadioGroup, Stack, Text, useRadioGroup } from "@chakra-ui/react";
import * as React from "react";
import { GiDiamondsSmile, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { RadioCard } from "../../RadioCard";

type Step4Props = {};

const options = [
  { label: "Lower Payments", value: "lower-payment", icon: GiPayMoney },
  { label: "Pay Off Faster", value: "pay-off-faster", icon: GiTakeMyMoney },
  { label: "Just Browsing", value: "just-browsing", icon: GiDiamondsSmile },
];

export const Step4 = () => {
  const [service, setService] = React.useState(options[0].value);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Step4",
    defaultValue: undefined,
    onChange: (val) => setService(val),
  });

  const group = getRootProps();

  return (
    <Box sx={{ mb: 8 }}>
      <Heading size="lg" sx={{ mt: 8 }}>
        What&apos;s your main goal for refinancing?
      </Heading>
      <Text sx={{ mb: 8, mt: 4 }}>Select a property type below.</Text>
      <RadioGroup
        mb={4}
        name="Step4"
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
