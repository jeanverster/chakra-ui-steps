import { Box, Heading } from "@chakra-ui/layout";
import { Divider, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import * as React from "react";

type YourNameProps = {};

const YourName = (props: YourNameProps): JSX.Element => {
  return (
    <Box>
      <Heading size="lg" sx={{ mt: 8 }}>
        Let&apos;s start with your name
      </Heading>
      <Text sx={{ mb: 8, mt: 4, fontSize: "lg" }}>
        Don&apos;t worry, this is not a real form.
      </Text>
      <Divider mb={8} />
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" type="name" />
      </FormControl>
    </Box>
  );
};

export default YourName;
