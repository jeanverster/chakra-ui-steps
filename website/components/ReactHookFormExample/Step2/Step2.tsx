import { Box, Heading } from "@chakra-ui/layout";
import { RadioGroup, Stack, Text, useRadioGroup } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { GiBirdHouse, GiGreenhouse, GiSydneyOperaHouse } from "react-icons/gi";
import * as yup from "yup";
import { FormValues } from "..";
import { RadioCard } from "../../RadioCard";

export const Step2Schema = yup.object().shape({
  homeType: yup.string().required("This value is required."),
});

const options = [
  { label: "Family home", value: "family-home", icon: GiGreenhouse },
  {
    label: "Townhouse",
    value: "townhouse",
    icon: GiSydneyOperaHouse,
  },
  { label: "Condo", value: "condo", icon: GiBirdHouse },
];

export const Step2 = () => {
  const { control } = useFormContext<FormValues>();

  const {
    field,
    formState: { errors },
  } = useController({
    name: "homeType",
    control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "homeType",
    defaultValue: field.value,
    onChange: field.onChange,
  });

  const group = getRootProps();

  return (
    <Box
      sx={{
        mb: 8,
        display: "flex",
        flexDir: "column",
        alignItems: "center",
      }}
    >
      <Heading size="lg" sx={{ mt: 8 }}>
        What&apos;s your dream home?
      </Heading>
      <Text sx={{ mt: 4 }}>Select a property type below.</Text>
      <RadioGroup mb={4} name="Step2" sx={{ mt: 8 }}>
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
      {errors.homeType && (
        <Text sx={{ mt: 2 }} color="red.500">
          {errors.homeType.message}
        </Text>
      )}
    </Box>
  );
};
