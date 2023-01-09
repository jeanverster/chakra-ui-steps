import { Box, Heading } from "@chakra-ui/layout";
import { RadioGroup, Stack, Text, useRadioGroup } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { GiDiamondsSmile, GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import * as yup from "yup";
import { FormValues } from "..";
import { ErrorMessage } from "../../ErrorMessage";
import { RadioCard } from "../../RadioCard";

export const Step4Schema = yup.object().shape({
  goal: yup.string().required("This value is required."),
});

const options = [
  {
    label: "Lower Payments",
    value: "lower-payment",
    icon: GiPayMoney,
  },
  {
    label: "Pay Off Faster",
    value: "pay-off-faster",
    icon: GiTakeMyMoney,
  },
  {
    label: "Just Browsing",
    value: "just-browsing",
    icon: GiDiamondsSmile,
  },
];

export const Step4 = () => {
  const { control } = useFormContext<FormValues>();

  const {
    field,
    formState: { errors },
  } = useController({
    name: "goal",
    control,
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "goal",
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
      <Heading
        size="lg"
        sx={{
          mt: 8,
        }}
      >
        What&apos;s your main goal for refinancing?
      </Heading>
      <Text sx={{ mt: 4 }}>Select a property type below.</Text>
      <RadioGroup mb={4} name="Step4" defaultValue={field.value} sx={{ mt: 8 }}>
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
      {errors.goal && <ErrorMessage message={errors.goal?.message || ""} />}
    </Box>
  );
};
