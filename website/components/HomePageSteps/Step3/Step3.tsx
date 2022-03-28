import { Box, Heading } from "@chakra-ui/layout";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

type Step3Props = {};

export const Step3 = (props: Step3Props) => {
  const [sliderValue, setSliderValue] = React.useState(100);

  const amount = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(sliderValue * 10000);

  return (
    <Box sx={{ mb: 8 }}>
      <Heading size="lg" sx={{ mt: 8 }}>
        Estimated home value
      </Heading>
      <Text sx={{ mb: 8, mt: 4 }}>
        Use the slider to estimate the home value.
      </Text>
      <Heading>{amount}</Heading>
      <Slider
        id="slider"
        defaultValue={5}
        min={0}
        max={100}
        colorScheme="blue"
        onChange={(v) => setSliderValue(v)}
        sx={{ my: 10 }}
      >
        <SliderTrack sx={{ height: 1.5 }}>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </Box>
  );
};
