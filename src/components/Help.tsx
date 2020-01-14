import React from "react";
import { Text, Box, Color } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

export const Help = () => {
  return (
    <Box flexDirection="column" alignItems="center" width={54} textWrap="wrap">
      <Gradient name="pastel">
        <BigText text="wiki cli" />
      </Gradient>
      <Box>
        <Color blue>
          <Text bold>v0.0.4</Text>
        </Color>
      </Box>
      <Box margin={1}>
        <Text bold>Just type what you wanna look up! :)</Text>
      </Box>
    </Box>
  );
};
